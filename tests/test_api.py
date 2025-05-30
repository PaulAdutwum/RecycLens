# tests/test_api.py

import os
import requests

# Your inference URL
URL = "http://127.0.0.1:8000/classify"

# Classes you want to test
TEST_CLASSES = ["clothes", "cardboard"]

for cls in TEST_CLASSES:
    cls_dir = os.path.join("data", "test", cls)
    # find the first image file in that directory
    img_files = [
        fn for fn in os.listdir(cls_dir)
        if fn.lower().endswith((".jpg", ".jpeg", ".png"))
    ]
    if not img_files:
        print(f"No images found in {cls_dir}, skipping.")
        continue

    img_path = os.path.join(cls_dir, img_files[0])
    print(f"Testing class '{cls}' with file: {img_path}")

    # open and post the image
    with open(img_path, "rb") as f:
        resp = requests.post(URL, files={"file": f})

    print("Status:", resp.status_code)
    print("Response:", resp.json())
    print("-" * 40)