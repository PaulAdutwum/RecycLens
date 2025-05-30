# src/train.py

import os
import torch
from torch import nn, optim
from torchvision import models
from src.data import get_dataloaders

# Configurations
DATA_DIR    = "data/raw"
BATCH_SIZE  = 32
IMG_SIZE    = 224
VAL_SPLIT   = 0.2
NUM_EPOCHS  = 5
LR          = 1e-3
MODEL_PATH  = "models/baseline_resnet18.ts"

def train():
    # 1. Prepare device
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print("Training on", device)

    # 2. Get DataLoaders
    train_loader, val_loader, classes = get_dataloaders(
        data_dir=DATA_DIR,
        batch_size=BATCH_SIZE,
        img_size=IMG_SIZE,
        val_split=VAL_SPLIT
    )
    num_classes = len(classes)

    # 3. Build Model (ResNet18 transfer learning)
    model = models.resnet18(pretrained=True)
    # Replace the final fully-connected layer
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    model = model.to(device)

    # 4. Loss and Optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=LR)

    best_val_acc = 0.0

    # 5. Training Loop
    for epoch in range(1, NUM_EPOCHS + 1):
        model.train()
        running_loss = 0.0

        for images, labels in train_loader:
            images, labels = images.to(device), labels.to(device)

            optimizer.zero_grad()
            outputs = model(images)
            loss    = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * images.size(0)

        epoch_loss = running_loss / len(train_loader.dataset)

        # 6. Validation Loop
        model.eval()
        correct = 0
        with torch.no_grad():
            for images, labels in val_loader:
                images, labels = images.to(device), labels.to(device)
                outputs = model(images)
                _, preds = torch.max(outputs, 1)
                correct += (preds == labels).sum().item()

        val_acc = correct / len(val_loader.dataset)

        print(f"Epoch {epoch}/{NUM_EPOCHS}  "
              f"Train Loss: {epoch_loss:.4f}  "
              f"Val Acc: {val_acc:.4f}")

        # 7. Save best model
        if val_acc > best_val_acc:
            best_val_acc = val_acc
            # Export to TorchScript
            scripted = torch.jit.script(model.cpu())
            os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
            scripted.save(MODEL_PATH)
            model.to(device)
            print(f"→ New best model saved with val_acc={best_val_acc:.4f}")

if __name__ == "__main__":
    train()