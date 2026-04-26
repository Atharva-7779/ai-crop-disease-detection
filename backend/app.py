from flask import Flask, request, jsonify
from flask_cors import CORS
from model import load_model, predict
import os, uuid

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

model_loaded = load_model()

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "model_ready": model_loaded})

@app.route("/predict", methods=["POST"])
def predict_disease():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400
    file = request.files["image"]
    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type. Use PNG or JPG."}), 400
    filename = f"{uuid.uuid4().hex}.jpg"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)
    result = predict(filepath)
    os.remove(filepath)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=8000)
