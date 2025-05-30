# Smart Waste Classifier

**Instantly sort your waste with AI-powered image classification**

A web application that uses a Convolutional Neural Network (CNN) to classify waste items into 12 categories (e.g., paper, plastic, metal, organic) in real time. Built with PyTorch, FastAPI, and Next.js, this tool helps reduce recycling contamination and promotes environmental sustainability through intuitive technology.

---

## 🚀 Features

- **Real-time camera scanning**: Use your device’s camera to capture and classify items on the fly.  
- **Image upload**: Drop or select any photo to get instant classification.  
- **High accuracy**: Transfer-learned ResNet-18 model achieves >92% test accuracy on hold-out data.  
- **Responsive UI**: Sleek white & green design, mobile-first layout powered by Tailwind CSS.  
- **Feedback & roadmap**: Submit feedback and view planned enhancements for continuous improvement.

---

## 🔧 Tech Stack

- **Model & Training**: PyTorch, torchvision, TorchScript  
- **Backend**: FastAPI, Uvicorn, python-multipart, CORS middleware  
- **Frontend**: Next.js (React App Router), TypeScript, Tailwind CSS  
- **Icons & UX**: lucide-react, custom animations, responsive design

---

## 📥 Installation & Setup

1. **Clone the repo**  
   ```bash
   git clone https://github.com/pauladichum/smart-waste-classifier.git
   cd smart-waste-classifier
