from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import statistics

# Loading Models and important data
final_svm_model = joblib.load("models/svm_model.pkl")
final_nb_model = joblib.load("models/nb_model.pkl")
final_rf_model = joblib.load("models/rf_model.pkl")
encoder = joblib.load("models/label_encoder.pkl")
data_dict = joblib.load("models/data_dict.pkl")

# تعریف اسکیمای ورودی API
class SymptomsInput(BaseModel):
    symptoms: str   # مثال: "Itching,Skin Rash,Nodal Skin Eruptions"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # برای تست همه منبع‌ها آزاد
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Disease Prediction API is running 🚀"}

@app.post("/predict")
def predict_disease(input_data: SymptomsInput):
    symptoms = input_data.symptoms.split(",")
    symptoms = [word.capitalize() for word in symptoms]
    input_vector = [0] * len(data_dict["symptom_index"])
    for symptom in symptoms:
        index = data_dict["symptom_index"][symptom]
        input_vector[index] = 1

    input_vector = np.array(input_vector).reshape(1, -1)

    rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_vector)[0]]
    nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_vector)[0]]
    svm_prediction = data_dict["predictions_classes"][final_svm_model.predict(input_vector)[0]]

    final_prediction = statistics.mode([rf_prediction, nb_prediction, svm_prediction])

    return {
        "rf_model_prediction": rf_prediction,
        "nb_model_prediction": nb_prediction,
        "svm_model_prediction": svm_prediction,
        "final_prediction": final_prediction
    }
