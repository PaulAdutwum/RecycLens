from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
from PIL import Image
import torch
from torchvision import transforms

from src.db import predictions_collection  
from datetime import datetime  

app = FastAPI(title="Waste Classifier API")

# Enable CORS so that frontend (Next.js at localhost:3000) can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",  "http://localhost:3001",],  # frontend origin
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Load the best model
MODEL_PATH = "models/epoch3_val0.8991.ts"
model = torch.jit.load(MODEL_PATH)
model.eval()

# 2. Preprocessing pipeline (must match training)
preprocess = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406],
                         std=[0.229,0.224,0.225])
])

# 3. Class names (same order as training)
classes = [
    "battery","biological","brown-glass","cardboard","clothes",
    "green-glass","metal","paper","plastic","shoes","trash","white-glass"
]

@app.post("/classify")
async def classify_image(file: UploadFile = File(...)):
    """
    Accepts an uploaded image file, runs the model,
    and returns the predicted label and confidence.
    """
    img_bytes = await file.read()
    img = Image.open(BytesIO(img_bytes)).convert("RGB")
    input_tensor = preprocess(img).unsqueeze(0)

    with torch.no_grad():
        outputs = model(input_tensor)
        probs = torch.softmax(outputs, dim=1)[0]
        confidence, idx = torch.max(probs, 0)

    label = classes[idx]
    confidence_score = round(float(confidence), 4)

    # --- Save the prediction to MongoDB (non-blocking, doesn’t affect your API)
    await predictions_collection.insert_one({
        "label": label,
        "confidence": confidence_score,
        "timestamp": datetime.utcnow(),
        # You can also log: "filename": file.filename, etc.
    })

    return {
        "label": label,
        "confidence": confidence_score
    }