#!/bin/bash

echo "=========================================="
echo "Testing AI Crop Disease Detection System"
echo "=========================================="
echo ""

cd "/Users/atharv/Desktop/AI driven crop diseases dettection"

# Activate virtual environment
source venv/bin/activate

# Test backend
echo "1. Testing Backend Model..."
cd backend
python << 'EOF'
from model import load_model, predict
import json

print("Loading model...")
if load_model():
    print("✓ Model loaded successfully!")
    
    # Test with a disease image
    test_image = "/Users/atharv/Desktop/AI driven crop diseases dettection/dataset/train/Potato___Early_blight/acb84d77-5b1c-4beb-be27-99fee467bf1f___RS_Early.B 7577.JPG"
    
    print("\nTesting prediction...")
    result = predict(test_image)
    
    print("\n✓ Prediction Result:")
    print(f"  Disease: {result['disease']}")
    print(f"  Confidence: {result['confidence']}%")
    
    if 'symptoms' in result:
        print(f"\n✓ Symptoms: {len(result['symptoms'])} items")
        print(f"✓ Treatment: {len(result['treatment'])} steps")
        print(f"✓ Prevention: {len(result['prevention'])} tips")
        print(f"✓ Fertilizer: {result['fertilizer']['name']}")
        print(f"✓ Recovery Time: {result['recovery_time']}")
        print("\n✅ ALL FEATURES WORKING!")
    else:
        print("\n❌ Detailed information missing!")
else:
    print("❌ Model failed to load!")
EOF

echo ""
echo "=========================================="
echo "2. Starting Backend Server..."
echo "=========================================="
echo ""
echo "Run this command in a new terminal:"
echo "cd '/Users/atharv/Desktop/AI driven crop diseases dettection' && ./start_backend.sh"
echo ""
echo "Then open: frontend/index.html in your browser"
echo ""
echo "Test Steps:"
echo "1. Sign up/Login"
echo "2. Upload a diseased leaf image"
echo "3. Click 'Analyze Disease'"
echo "4. You should see:"
echo "   ✓ Confidence Score"
echo "   ✓ Common Symptoms (bullet list)"
echo "   ✓ Recommended Treatment (numbered steps)"
echo "   ✓ Prevention Tips (bullet list)"
echo "   ✓ Fertilizer Guide (4 cards)"
echo "   ✓ Expected Recovery Time"
echo ""
