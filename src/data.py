# src/data.py

import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader, random_split

def get_dataloaders(data_dir="data/raw",
                    batch_size=32,
                    img_size=224,
                    val_split=0.2):
    # 1. Transforms
    transform = transforms.Compose([
        transforms.Resize((img_size, img_size)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

    # 2. Full dataset
    full_ds = datasets.ImageFolder(root=data_dir, transform=transform)
    total = len(full_ds)
    val_size = int(total * val_split)
    train_size = total - val_size

    # 3. Split
    train_ds, val_ds = random_split(full_ds, [train_size, val_size])

    # 4. DataLoaders
    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_ds, batch_size=batch_size, shuffle=False)

    return train_loader, val_loader, full_ds.classes