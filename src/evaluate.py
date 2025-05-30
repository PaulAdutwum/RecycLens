# src/evaluate.py

import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader

# 1. Load model
model = torch.jit.load("models/epoch3_val0.8991.ts")
model.eval()

# 2. Prepare test DataLoader
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485,0.456,0.406],
                         std=[0.229,0.224,0.225])
])
test_ds = datasets.ImageFolder("data/test", transform=transform)
test_loader = DataLoader(test_ds, batch_size=32, shuffle=False)

# 3. Run inference and compute accuracy
correct = 0
total   = 0
with torch.no_grad():
    for images, labels in test_loader:
        outputs = model(images)
        preds   = outputs.argmax(dim=1)
        correct += (preds == labels).sum().item()
        total   += labels.size(0)

print(f"Test Accuracy: {100*correct/total:.2f}%")