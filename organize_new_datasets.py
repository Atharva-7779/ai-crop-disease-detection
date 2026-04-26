#!/usr/bin/env python3
"""
Custom Dataset Organization for Downloaded Datasets
"""

import os
import shutil
from pathlib import Path
import random

DATASET_DIR = "dataset"
TRAIN_SPLIT = 0.8

# Mapping downloaded folders to our standard naming
DATASET_MAPPING = {
    # Cotton Disease Dataset
    "diseased cotton leaf": "Cotton___Bacterial_Blight",
    "diseased cotton plant": "Cotton___Fusarium_Wilt",
    "fresh cotton leaf": "Cotton___healthy",
    "fresh cotton plant": "Cotton___healthy",
    
    # Sugarcane Dataset
    "Bacterial Blight": "Sugarcane___Bacterial_Blight",
    "Red Rot": "Sugarcane___Red_Rot",
    "Healthy": "Sugarcane___healthy",
    
    # Wheat Dataset
    "septoria": "Wheat___Septoria_Leaf_Spot",
    "stripe_rust": "Wheat___Rust",
    "Healthy": "Wheat___healthy",
}

def create_directories():
    """Create train/val directories for new classes"""
    classes = set(DATASET_MAPPING.values())
    for split in ["train", "val"]:
        for cls in classes:
            path = os.path.join(DATASET_DIR, split, cls)
            os.makedirs(path, exist_ok=True)
    print("✓ Directory structure created")

def copy_images(src_folder, dest_class, image_list, split):
    """Copy images to destination"""
    count = 0
    for img in image_list:
        src = os.path.join(src_folder, img)
        if os.path.isfile(src):
            dst = os.path.join(DATASET_DIR, split, dest_class, img)
            shutil.copy2(src, dst)
            count += 1
    return count

def organize_cotton():
    """Organize Cotton Disease dataset"""
    print("\n📦 Organizing Cotton Disease Dataset...")
    cotton_base = os.path.expanduser("~/Downloads/Cotton Disease")
    
    if not os.path.exists(cotton_base):
        print("✗ Cotton Disease folder not found")
        return 0
    
    stats = {"train": 0, "val": 0}
    
    # Cotton already has train/val split, so we use it directly
    for split in ["train", "val"]:
        split_path = os.path.join(cotton_base, split)
        if not os.path.exists(split_path):
            continue
            
        for folder in os.listdir(split_path):
            src_folder = os.path.join(split_path, folder)
            if not os.path.isdir(src_folder):
                continue
            
            # Map to our naming convention
            dest_class = DATASET_MAPPING.get(folder)
            if not dest_class:
                print(f"⚠ Unknown cotton class: {folder}")
                continue
            
            # Get images
            images = [f for f in os.listdir(src_folder) 
                     if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
            
            # Copy images
            count = copy_images(src_folder, dest_class, images, split)
            stats[split] += count
            print(f"  ✓ {folder} → {dest_class}: {count} images ({split})")
    
    return stats["train"] + stats["val"]

def organize_sugarcane():
    """Organize Sugarcane dataset"""
    print("\n📦 Organizing Sugarcane Dataset...")
    sugarcane_base = os.path.expanduser("~/Downloads/sugarcane RA")
    
    if not os.path.exists(sugarcane_base):
        print("✗ Sugarcane folder not found")
        return 0
    
    total = 0
    
    for folder in os.listdir(sugarcane_base):
        src_folder = os.path.join(sugarcane_base, folder)
        if not os.path.isdir(src_folder):
            continue
        
        dest_class = DATASET_MAPPING.get(folder)
        if not dest_class:
            print(f"⚠ Unknown sugarcane class: {folder}")
            continue
        
        # Get images
        images = [f for f in os.listdir(src_folder) 
                 if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        
        if not images:
            print(f"⚠ No images in {folder}")
            continue
        
        # Split 80/20
        random.shuffle(images)
        split_idx = int(len(images) * TRAIN_SPLIT)
        train_images = images[:split_idx]
        val_images = images[split_idx:]
        
        # Copy images
        train_count = copy_images(src_folder, dest_class, train_images, "train")
        val_count = copy_images(src_folder, dest_class, val_images, "val")
        
        total += len(images)
        print(f"  ✓ {folder} → {dest_class}: {train_count} train, {val_count} val")
    
    return total

def organize_wheat():
    """Organize Wheat dataset"""
    print("\n📦 Organizing Wheat Dataset...")
    wheat_base = os.path.expanduser("~/Downloads/wheat_leaf")
    
    if not os.path.exists(wheat_base):
        print("✗ Wheat folder not found")
        return 0
    
    total = 0
    
    for folder in os.listdir(wheat_base):
        src_folder = os.path.join(wheat_base, folder)
        if not os.path.isdir(src_folder):
            continue
        
        # Handle both "Healthy" cases (sugarcane and wheat)
        if folder == "Healthy":
            dest_class = "Wheat___healthy"
        else:
            dest_class = DATASET_MAPPING.get(folder)
        
        if not dest_class:
            print(f"⚠ Unknown wheat class: {folder}")
            continue
        
        # Get images
        images = [f for f in os.listdir(src_folder) 
                 if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
        
        if not images:
            print(f"⚠ No images in {folder}")
            continue
        
        # Split 80/20
        random.shuffle(images)
        split_idx = int(len(images) * TRAIN_SPLIT)
        train_images = images[:split_idx]
        val_images = images[split_idx:]
        
        # Copy images
        train_count = copy_images(src_folder, dest_class, train_images, "train")
        val_count = copy_images(src_folder, dest_class, val_images, "val")
        
        total += len(images)
        print(f"  ✓ {folder} → {dest_class}: {train_count} train, {val_count} val")
    
    return total

def show_final_stats():
    """Show complete dataset statistics"""
    print("\n" + "="*60)
    print("📊 COMPLETE DATASET STATISTICS")
    print("="*60)
    
    for split in ["train", "val"]:
        split_path = os.path.join(DATASET_DIR, split)
        if not os.path.exists(split_path):
            continue
        
        print(f"\n{split.upper()}:")
        classes = sorted(os.listdir(split_path))
        total_images = 0
        
        for cls in classes:
            cls_path = os.path.join(split_path, cls)
            if os.path.isdir(cls_path):
                count = len([f for f in os.listdir(cls_path) 
                           if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
                if count > 0:
                    total_images += count
                    print(f"  {cls}: {count} images")
        
        print(f"\n  Total: {len(classes)} classes, {total_images} images")

def main():
    print("="*60)
    print("Custom Dataset Organization")
    print("="*60)
    
    print("\n🔄 Creating directory structure...")
    create_directories()
    
    # Organize each dataset
    cotton_count = organize_cotton()
    sugarcane_count = organize_sugarcane()
    wheat_count = organize_wheat()
    
    # Summary
    print("\n" + "="*60)
    print("📈 ORGANIZATION SUMMARY")
    print("="*60)
    print(f"Cotton images added: {cotton_count}")
    print(f"Sugarcane images added: {sugarcane_count}")
    print(f"Wheat images added: {wheat_count}")
    print(f"Total new images: {cotton_count + sugarcane_count + wheat_count}")
    
    # Show complete stats
    show_final_stats()
    
    print("\n" + "="*60)
    print("✅ DONE! Next step:")
    print("   cd model && python3 train.py")
    print("="*60)

if __name__ == "__main__":
    main()
