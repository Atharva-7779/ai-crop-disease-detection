#!/bin/bash

echo "=========================================="
echo "Starting Krushi AI Care Frontend Server"
echo "=========================================="
echo ""
echo "Frontend will be available at:"
echo "👉 http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

cd "/Users/atharv/Desktop/AI driven crop diseases dettection/frontend"
python3 -m http.server 3000
