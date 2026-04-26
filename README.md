# AI-Driven Crop Disease Detection

Detect crop diseases from leaf images using deep learning (ResNet18 transfer learning).

## Project Structure
```
├── backend/        # Flask REST API
├── frontend/       # HTML/CSS/JS UI
├── model/          # Training script + saved model
└── dataset/        # Your training images (train/ & val/)
```

## Setup & Run

### 1. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Prepare Dataset
Organize your images like this:
```
dataset/
  train/
    Healthy/        image1.jpg ...
    Leaf_Blight/    image1.jpg ...
    Powdery_Mildew/ image1.jpg ...
  val/
    Healthy/        ...
    Leaf_Blight/    ...
```
> Recommended dataset: [PlantVillage on Kaggle](https://www.kaggle.com/datasets/emmarex/plantdisease)

### 3. Train the Model
```bash
cd model
python train.py
```
This saves `crop_disease_model.pth` and `labels.json` inside `model/`.

### 4. Start the Backend
```bash
cd backend
python app.py
```
API runs at `http://localhost:5000`

### 5. Open the Frontend
Open `frontend/index.html` in your browser (or use Live Server in VS Code).

## API Endpoints
| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| GET    | /health    | Check server & model status |
| POST   | /predict   | Upload image, get prediction |

## Tech Stack
- Frontend: HTML, CSS, Vanilla JS
- Backend: Python, Flask
- ML: PyTorch, ResNet18 (Transfer Learning)
