"""
Splits PlantVillage dataset into train/ and val/ with 80/20 ratio.
Run from project root:
  python setup_dataset.py
"""

import os, shutil, random

SRC  = os.path.expanduser("~/Downloads/PlantVillage")
DEST = os.path.join(os.path.dirname(__file__), "dataset")
SPLIT = 0.8
random.seed(42)

classes = [d for d in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, d))]
print(f"Found {len(classes)} classes\n")

for cls in classes:
    src_cls = os.path.join(SRC, cls)
    images  = [f for f in os.listdir(src_cls) if f.lower().endswith((".jpg", ".jpeg", ".png"))]
    random.shuffle(images)
    split   = int(len(images) * SPLIT)
    splits  = {"train": images[:split], "val": images[split:]}

    for phase, files in splits.items():
        dest_dir = os.path.join(DEST, phase, cls)
        os.makedirs(dest_dir, exist_ok=True)
        for f in files:
            shutil.copy2(os.path.join(src_cls, f), os.path.join(dest_dir, f))
    print(f"  {cls}: {len(splits['train'])} train / {len(splits['val'])} val")

print("\nDataset ready in dataset/train and dataset/val")
