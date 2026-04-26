#!/usr/bin/env python3
"""
Dataset Organization Script
Organizes downloaded crop disease images into train/val structure
"""

import os
import shutil
from pathlib import Path
import random

# Configuration
DATASET_DIR = "dataset"
TRAIN_SPLIT = 0.8  # 80% train, 20% validation

# Disease class mapping (folder names must match these exactly)
DISEASE_CLASSES = {
    # Wheat diseases
    "Wheat___Rust": ["wheat_rust", "wheat rust", "rust wheat"],
    "Wheat___Powdery_Mildew": ["wheat_powdery_mildew", "wheat powdery mildew"],
    "Wheat___Leaf_Blight": ["wheat_leaf_blight", "wheat leaf blight"],
    "Wheat___Smut": ["wheat_smut", "wheat smut"],
    "Wheat___healthy": ["wheat_healthy", "wheat healthy"],
    
    # Sugarcane diseases
    "Sugarcane___Red_Rot": ["sugarcane_red_rot", "sugarcane red rot"],
    "Sugarcane___Smut": ["sugarcane_smut", "sugarcane smut"],
    "Sugarcane___Rust": ["sugarcane_rust", "sugarcane rust"],
    "Sugarcane___healthy": ["sugarcane_healthy", "sugarcane healthy"],
    
    # Cotton diseases
    "Cotton___Leaf_Curl": ["cotton_leaf_curl", "cotton leaf curl"],
    "Cotton___Bacterial_Blight": ["cotton_bacterial_blight", "cotton bacterial blight"],
    "Cotton___Fusarium_Wilt": ["cotton_fusarium_wilt", "cotton fusarium wilt"],
    "Cotton___Root_Rot": ["cotton_root_rot", "cotton root rot"],
    "Cotton___healthy": ["cotton_healthy", "cotton healthy"],
}

def create_directory_structure():
    """Create train and val directories"""
    for split in ["train", "val"]:
        for disease_class in DISEASE_CLASSES.keys():
            path = os.path.join(DATASET_DIR, split, disease_class)
            os.makedirs(path, exist_ok=True)
    print("✓ Directory structure created")

def find_source_folder(source_dir, disease_class):
    """Find matching source folder for a disease class"""
    possible_names = DISEASE_CLASSES[disease_class]
    
    for root, dirs, files in os.walk(source_dir):
        for dir_name in dirs:
            if dir_name.lower() in [name.lower() for name in possible_names]:
                return os.path.join(root, dir_name)
    return None

def organize_images(source_dir):
    """Organize images from source directory into train/val splits"""
    if not os.path.exists(source_dir):
        print(f"✗ Source directory not found: {source_dir}")
        return
    
    stats = {"total": 0, "train": 0, "val": 0, "skipped": 0}
    
    for disease_class in DISEASE_CLASSES.keys():
        source_folder = find_source_folder(source_dir, disease_class)
        
        if not source_folder:
            print(f"⚠ No source folder found for: {disease_class}")
            continue
        
        # Get all image files
        image_extensions = {'.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'}
        images = [f for f in os.listdir(source_folder) 
                 if os.path.splitext(f)[1] in image_extensions]
        
        if not images:
            print(f"⚠ No images found in: {source_folder}")
            continue
        
        # Shuffle and split
        random.shuffle(images)
        split_idx = int(len(images) * TRAIN_SPLIT)
        train_images = images[:split_idx]
        val_images = images[split_idx:]
        
        # Copy images
        for img in train_images:
            src = os.path.join(source_folder, img)
            dst = os.path.join(DATASET_DIR, "train", disease_class, img)
            shutil.copy2(src, dst)
            stats["train"] += 1
        
        for img in val_images:
            src = os.path.join(source_folder, img)
            dst = os.path.join(DATASET_DIR, "val", disease_class, img)
            shutil.copy2(src, dst)
            stats["val"] += 1
        
        stats["total"] += len(images)
        print(f"✓ {disease_class}: {len(train_images)} train, {len(val_images)} val")
    
    print(f"\n📊 Summary:")
    print(f"   Total images: {stats['total']}")
    print(f"   Train: {stats['train']}")
    print(f"   Val: {stats['val']}")

def show_dataset_stats():
    """Display current dataset statistics"""
    print("\n📈 Current Dataset Statistics:")
    print("-" * 60)
    
    for split in ["train", "val"]:
        split_path = os.path.join(DATASET_DIR, split)
        if not os.path.exists(split_path):
            continue
        
        print(f"\n{split.upper()}:")
        classes = sorted(os.listdir(split_path))
        total = 0
        
        for cls in classes:
            cls_path = os.path.join(split_path, cls)
            if os.path.isdir(cls_path):
                count = len([f for f in os.listdir(cls_path) 
                           if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
                if count > 0:
                    print(f"  {cls}: {count} images")
                    total += 1
        
        print(f"  Total classes: {total}")

def main():
    print("=" * 60)
    print("Dataset Organization Tool")
    print("=" * 60)
    
    print("\n📁 Instructions:")
    print("1. Download disease datasets from Kaggle or other sources")
    print("2. Extract them to a folder (e.g., 'downloaded_images/')")
    print("3. Run this script and provide the source folder path")
    print("\nFolder names should contain disease names like:")
    print("  - wheat_rust, sugarcane_red_rot, cotton_leaf_curl, etc.")
    print("=" * 60)
    
    # Show current stats
    if os.path.exists(DATASET_DIR):
        show_dataset_stats()
    
    print("\n" + "=" * 60)
    choice = input("\nChoose an option:\n1. Organize new images\n2. Show dataset stats only\n3. Create directory structure only\n\nEnter choice (1/2/3): ").strip()
    
    if choice == "1":
        source_dir = input("\nEnter source directory path (e.g., downloaded_images/): ").strip()
        print("\n🔄 Creating directory structure...")
        create_directory_structure()
        print("\n🔄 Organizing images...")
        organize_images(source_dir)
        show_dataset_stats()
        print("\n✅ Done! You can now run: cd model && python train.py")
    
    elif choice == "2":
        show_dataset_stats()
    
    elif choice == "3":
        create_directory_structure()
        print("\n✅ Directory structure created!")
        print("Now manually copy images into the appropriate folders.")
    
    else:
        print("Invalid choice!")

if __name__ == "__main__":
    main()
