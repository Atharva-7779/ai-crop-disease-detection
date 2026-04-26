import torch
import torch.nn as nn
from torchvision import datasets, models, transforms
from torch.utils.data import DataLoader
from tqdm import tqdm
import json, os

DATASET_DIR = os.path.join(os.path.dirname(__file__), "../dataset")
MODEL_OUT   = os.path.join(os.path.dirname(__file__), "crop_disease_model.pth")
LABELS_OUT  = os.path.join(os.path.dirname(__file__), "labels.json")
EPOCHS      = 5
BATCH_SIZE  = 64
LR          = 0.001

transform = {
    "train": transforms.Compose([
        transforms.RandomResizedCrop(224),
        transforms.RandomHorizontalFlip(),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ]),
    "val": transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
    ])
}

def train():
    datasets_ = {s: datasets.ImageFolder(os.path.join(DATASET_DIR, s), transform[s]) for s in ["train", "val"]}
    loaders   = {s: DataLoader(datasets_[s], batch_size=BATCH_SIZE, shuffle=(s=="train"), num_workers=2) for s in ["train", "val"]}
    num_classes = len(datasets_["train"].classes)

    labels = {str(v): k for k, v in datasets_["train"].class_to_idx.items()}
    with open(LABELS_OUT, "w") as f:
        json.dump(labels, f, indent=2)
    print(f"Classes ({num_classes}): {list(labels.values())}\n")

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Training on: {device}\n")

    model = models.resnet18(weights="IMAGENET1K_V1")
    # Freeze all layers except final classifier
    for param in model.parameters():
        param.requires_grad = False
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    model.to(device)

    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.fc.parameters(), lr=LR)

    for epoch in range(EPOCHS):
        print(f"Epoch {epoch+1}/{EPOCHS}")
        for phase in ["train", "val"]:
            model.train() if phase == "train" else model.eval()
            running_loss, correct = 0.0, 0
            loop = tqdm(loaders[phase], desc=f"  {phase}", leave=True)
            for inputs, labels_ in loop:
                inputs, labels_ = inputs.to(device), labels_.to(device)
                optimizer.zero_grad()
                with torch.set_grad_enabled(phase == "train"):
                    outputs = model(inputs)
                    loss = criterion(outputs, labels_)
                    if phase == "train":
                        loss.backward()
                        optimizer.step()
                running_loss += loss.item() * inputs.size(0)
                correct += (outputs.argmax(1) == labels_).sum().item()
                loop.set_postfix(loss=f"{loss.item():.3f}")
            size = len(datasets_[phase])
            print(f"  {phase} Loss: {running_loss/size:.4f}  Acc: {correct/size:.4f}\n")

    torch.save(model.state_dict(), MODEL_OUT)
    print(f"Model saved → {MODEL_OUT}")
    print(f"Labels saved → {LABELS_OUT}")

if __name__ == "__main__":
    train()
