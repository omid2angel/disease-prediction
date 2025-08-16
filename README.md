# Disease Prediction System

This project is a **Machine Learning-powered Disease Prediction System** with a modern **React frontend** and a **FastAPI backend**.  
It allows users to input symptoms and receive predictions from multiple trained models (Naive Bayes, Random Forest, SVM).  

---

## ✨ Features
- 🧠 **Machine Learning Models**: Trained on medical datasets (Naive Bayes, Random Forest, SVM).  
- ⚡ **FastAPI Backend**: Handles predictions and serves trained models.  
- 🎨 **React + Vite Frontend**: Interactive user interface for entering symptoms.  
- 📊 **Jupyter Notebook**: Contains the model training process for reproducibility.  
- 🔒 **Modular Structure**: Easy to extend with new models or features.  

---


## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/disease-prediction.git
cd disease-prediction-main
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
Backend will start at: http://127.0.0.1:8000/
```

### 3. Frontend Setup (React + Vite)
```bash
cd frontend/Disease-project
npm install
npm run dev
Frontend will start at: http://localhost:5173/
```

### 4. Training the Models (Optional)
cd notebook
jupyter notebook disease-train.ipynb

## 📌 API Endpoints (Backend)

POST /predict → Send symptoms, receive disease prediction.

GET /health → Check server status.

## 🛠️ Tech Stack

Frontend: React, Vite, Tailwind CSS
Backend: FastAPI, scikit-learn, pickle
ML Models: Naive Bayes, Random Forest, SVM
Notebook: Jupyter, Pandas, NumPy, Matplotlib

## 📜 License

This project is licensed under the terms of the MIT License.

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.
