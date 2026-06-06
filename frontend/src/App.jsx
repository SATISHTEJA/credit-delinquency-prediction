import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [features, setFeatures] = useState(
        Array(24).fill("")
    );

    const [result, setResult] = useState(null);

    const handleChange = (index, value) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };

    const predictRisk = async () => {
        try {
            if (features.some((item) => item === "")) {
                alert("Please fill all fields");
                return;
            }
            const response = await axios.post(
                "http://127.0.0.1:8000/predict",
                {
                    features: features.map(Number),
                }
            );

            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert("Prediction Failed");
        }
    };
    const labels = [
        "Checking Account Status",
        "Duration",
        "Credit History",
        "Purpose",
        "Credit Amount",
        "Savings",
        "Employment",
        "Installment Rate",
        "Personal Status",
        "Guarantors",
        "Residence",
        "Property",
        "Age",
        "Installment Plans",
        "Housing",
        "Existing Credits",
        "Job",
        "Dependents",
        "Telephone",
        "Foreign Worker",
        "Feature 21",
        "Feature 22",
        "Feature 23",
        "Feature 24"
    ];

    return (
        <div className="container">
            <h1>AI-Powered Credit Delinquency Predictor</h1>

            <div className="grid">
                {features.map((value, index) => (
                    <input
                        key={index}
                        type="number"
                        placeholder={labels[index]}
                        value={value}
                        onChange={(e) =>
                            handleChange(index, e.target.value)
                        }
                    />
                ))}
            </div>

            <button onClick={predictRisk}>
                Predict Risk
            </button>

            {result && (
                <div className="result">
                    <h2
                        style={{
                            color:
                                result.prediction === 1
                                    ? "red"
                                    : "green",
                        }}
                    >
                        {result.prediction === 1
                            ? "🔴 High Risk"
                            : "🟢 Low Risk"}
                    </h2>

                    <h3>
                        Risk Score: {(result.risk_probability * 100).toFixed(2)}%
                    </h3>
                    <div className="progress">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${result.risk_probability * 100}%`,
                                background:
                                    result.risk_probability > 0.7
                                        ? "#ef4444"
                                        : result.risk_probability > 0.4
                                            ? "#f59e0b"
                                            : "#22c55e",
                            }}
                        />
                        <p>
                            {result.risk_probability > 0.7
                                ? "High Delinquency Risk"
                                : result.risk_probability > 0.4
                                    ? "Medium Delinquency Risk"
                                    : "Low Delinquency Risk"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;