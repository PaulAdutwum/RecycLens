# ♻️RECYCLENS


🚀
A web application that uses a Convolutional Neural Network (CNN) to classify waste items into 12 categories (e.g., paper, plastic, metal, organic) in real time. Built with PyTorch, FastAPI, and Next.js, this tool helps reduce recycling contamination and promotes environmental sustainability through intuitive technology.

---

## 🌐 Live Demo

* [Frontend (Vercel)](https://recyc-lens.vercel.app/)

*Note: Image classification will only work if you run the backend server locally and connect the frontend to it (see below).*

---

## 🚀 Features
- **Frontend:** responsive React app ([hosted on Vercel](https://recyc-lens.vercel.app/))
- * **Backend:** FastAPI REST API
- **Responsive UI**: Sleek white & green design, mobile-first layout powered by Tailwind CSS.  
-  **AI Model:** Trained on [Kaggle Waste Classification Dataset](https://www.kaggle.com/datasets)
-  * **Database:** MongoDB (for user logins and storing classified images/history)

---


## Important

**Currently, the backend is hosted *locally* (not on Render/cloud) due to reliability and free-tier limitations.**

* **Frontend**: Live and deployed on Vercel ([visit here](https://recyc-lens.vercel.app/))
* **Backend**: Must be run *locally* by each user—see setup below.
* **Why?**: Free cloud hosting (like Render) sleeps/shuts down, causing errors for real-time ML apps. This ensures you always get a working demo!

---


## 🗄️ Data Source

* **Dataset**: [Kaggle Waste Classification Dataset](https://www.kaggle.com/datasets/techsash/waste-classification-data)

  * *Instructions*: Download the dataset from Kaggle, place it in the `data/` folder in the backend directory.
* **Pre-trained Model**: Included (or instructions to train your own in `/model` folder).

---

## 🗃️ Database Setup

* Uses **MongoDB** for storing user info and classified image logs.

  * Set up a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster, or run MongoDB locally.
  * Add your MongoDB connection string to the backend `.env` file as `MONGODB_URI`.

---

##  Local Backend Setup

You’ll need **Python 3.9+** and **pip**. Clone this repo and follow these steps in your terminal:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/waste-classifier.git
   cd waste-classifier/src
   ```

2. **(Optional) Set up a virtual environment:**

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables:**

   * Create a `.env` file and add:

     ```
     MONGODB_URI=your_mongodb_connection_string
     SECRET_KEY=your_secret_key
     MODEL_PATH=path/to/model.h5
     ```

5. **Download and place the Kaggle dataset:**

   * Download from [Kaggle](https://www.kaggle.com/datasets/techsash/waste-classification-data)
   * Place images/data in `backend/data/`

6. **Run the backend server:**

   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   * The API will run at [http://localhost:8000](http://localhost:8000)


## 🧪 Development Notes

* The AI model can be retrained using scripts provided in the `src/train/` folder.
* Model accuracy, speed, and supported waste types can be improved with more data and training.
* Demo videos and screenshots are coming soon!

---

## 📦 Folder Structure

```
waste-classifier/
├── backend/
│   ├── main.py
│   ├── model/
│   ├── data/
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
└── README.md
```
