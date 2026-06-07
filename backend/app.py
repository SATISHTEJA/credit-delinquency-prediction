from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "model", "credit_model.pkl")

model = joblib.load(MODEL_PATH)

class PredictionInput(BaseModel):
    features: list[float]

@app.get("/")
def home():
    return {
        "message": "Credit Delinquency Prediction API Running"
    }

@app.post("/predict")
def predict(data: PredictionInput):

    prediction = model.predict(
        np.array(data.features).reshape(1, -1)
    )

    probability = model.predict_proba(
        np.array(data.features).reshape(1, -1)
    )

    return {
        "prediction": int(prediction[0]),
        "risk_probability": float(probability[0][1])
    }