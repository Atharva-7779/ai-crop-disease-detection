# Dataset Download Guide

## Recommended Dataset Sources

### 1. Wheat Disease Dataset

**Option A: Kaggle**
- Dataset: "Wheat Disease Detection Dataset"
- URL: https://www.kaggle.com/datasets/olyadgetch/wheat-leaf-dataset
- Classes: Healthy, Septoria, Stripe Rust, Tan Spot

**Option B: Alternative**
- Search Kaggle for: "wheat rust", "wheat disease"
- Look for datasets with multiple disease classes

### 2. Sugarcane Disease Dataset

**Option A: Kaggle**
- Search: "sugarcane disease dataset"
- URL: https://www.kaggle.com/search?q=sugarcane+disease

**Option B: Create Custom Dataset**
- Use Google Images with search terms:
  - "sugarcane red rot disease"
  - "sugarcane smut disease"
  - "sugarcane rust disease"
  - "healthy sugarcane plant"

### 3. Cotton Disease Dataset

**Option A: Kaggle**
- Dataset: "Cotton Disease Dataset"
- URL: https://www.kaggle.com/datasets/janmejaybhoi/cotton-disease-dataset
- Classes: Diseased Cotton Leaf, Fresh Cotton Leaf

**Option B: Alternative**
- Search: "cotton leaf curl virus dataset"
- URL: https://www.kaggle.com/search?q=cotton+disease

## Download Instructions

### Step 1: Install Kaggle API (Optional)

```bash
pip install kaggle
```

Configure Kaggle API:
1. Go to https://www.kaggle.com/settings
2. Click "Create New API Token"
3. Save `kaggle.json` to `~/.kaggle/`

### Step 2: Download Datasets

**Using Kaggle API:**
```bash
# Example for wheat dataset
kaggle datasets download -d olyadgetch/wheat-leaf-dataset
unzip wheat-leaf-dataset.zip -d downloaded_images/wheat/
```

**Manual Download:**
1. Visit the Kaggle dataset page
2. Click "Download" button
3. Extract to `downloaded_images/` folder

### Step 3: Organize Dataset Structure

```bash
# Run the organization script
python organize_dataset.py
```

Follow the prompts:
1. Choose option 1 (Organize new images)
2. Enter source directory: `downloaded_images/`
3. Script will automatically split into train/val

### Step 4: Verify Dataset

```bash
# Check dataset structure
python organize_dataset.py
# Choose option 2 (Show dataset stats)
```

Expected output:
```
TRAIN:
  Cotton___Bacterial_Blight: 400 images
  Cotton___Fusarium_Wilt: 380 images
  Cotton___Leaf_Curl: 420 images
  Cotton___Root_Rot: 350 images
  Cotton___healthy: 500 images
  Sugarcane___Red_Rot: 300 images
  Sugarcane___Rust: 280 images
  Sugarcane___Smut: 290 images
  Sugarcane___healthy: 400 images
  Wheat___Leaf_Blight: 350 images
  Wheat___Powdery_Mildew: 380 images
  Wheat___Rust: 400 images
  Wheat___Smut: 320 images
  Wheat___healthy: 450 images
```

### Step 5: Train Model

```bash
cd model
python train.py
```

Training will now include all 27+ disease classes (15 existing + 12 new).

## Alternative: Manual Organization

If you prefer manual organization:

1. Create directory structure:
```bash
python organize_dataset.py
# Choose option 3 (Create directory structure only)
```

2. Manually copy images:
```
dataset/
  train/
    Wheat___Rust/           # Copy 80% of wheat rust images here
    Wheat___Powdery_Mildew/ # Copy 80% of wheat mildew images here
    ...
  val/
    Wheat___Rust/           # Copy 20% of wheat rust images here
    Wheat___Powdery_Mildew/ # Copy 20% of wheat mildew images here
    ...
```

## Image Requirements

- **Format**: JPG, PNG
- **Minimum per class**: 100-200 images
- **Recommended per class**: 500+ images
- **Image quality**: Clear, well-lit leaf images
- **Split ratio**: 80% train, 20% validation

## Troubleshooting

**Issue**: "No source folder found for: Wheat___Rust"
- **Solution**: Ensure downloaded folder contains "wheat_rust" or similar name

**Issue**: "No images found in folder"
- **Solution**: Check image extensions (.jpg, .png) and folder structure

**Issue**: Low accuracy after training
- **Solution**: Add more images per class (aim for 500+)

## Quick Start Example

```bash
# 1. Download a dataset
mkdir -p downloaded_images
cd downloaded_images
# Download from Kaggle or manually

# 2. Go back to project root
cd ..

# 3. Organize dataset
python organize_dataset.py

# 4. Train model
cd model
python train.py

# 5. Test with backend
cd ../backend
python app.py
```

## Notes

- The model will automatically detect all disease classes in `dataset/train/`
- No code changes needed - just add images and retrain
- Backend `model.py` already has disease info for wheat, sugarcane, cotton
- Frontend fertilizer guide already supports these crops
