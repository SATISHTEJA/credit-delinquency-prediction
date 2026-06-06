import pandas as pd
import joblib
from xgboost import XGBClassifier

df = pd.read_csv(
    r"../dataset/statlog+german+credit+data/german.data-numeric",
    sep=r"\s+",
    header=None
)

X = df.iloc[:, :-1]

y = df.iloc[:, -1]
y = y.map({1: 0, 2: 1})

model = XGBClassifier(
    n_estimators=200,
    max_depth=4,
    learning_rate=0.05,
    random_state=42
)

model.fit(X, y)

joblib.dump(model, "../model/credit_model.pkl")

print("Model Saved Successfully!")