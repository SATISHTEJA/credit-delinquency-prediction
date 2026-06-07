import { useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";

function App() {
    const [features, setFeatures] = useState(Array(24).fill(""));
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

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
        "Feature 24",
    ];

    const handleChange = (index, value) => {
        const updated = [...features];
        updated[index] = value;
        setFeatures(updated);
    };

    const predictRisk = async () => {
        try {
            if (features.some((item) => item === "")) {
                toast.warning("Please fill all fields");
                return;
            }

            if (features.some((item) => Number(item) < 0)) {
                toast.error("Negative values are not allowed");
                return;
            }

            setLoading(true);

            const response = await axios.post(
                "https://credit-delinquency-prediction.onrender.com/predict",
                {
                    features: features.map(Number),
                }
            );

            setResult(response.data);
            toast.success("Prediction completed successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Prediction Failed");
        } finally {
            setLoading(false);
        }
    };

    const riskPercentage = result
        ? (result.risk_probability * 100).toFixed(0)
        : 0;

    return (
        <div className="app">
            <div className="dashboard">

                <div className="header">
                    <h1>💳 Credit Delinquency Predictor</h1>
                    <p>
                        AI-Powered Credit Risk Assessment Dashboard
                    </p>
                </div>

                <div className="top-cards">
                    <div className="stat-card">
                        <h3>Accuracy</h3>
                        <span>89%</span>
                    </div>

                    <div className="stat-card">
                        <h3>Features</h3>
                        <span>24 Inputs</span>
                    </div>

                    <div className="stat-card">
                        <h3>Prediction</h3>
                        <span>Real-Time</span>
                    </div>
                </div>

                <div className="main-section">

                    <div className="form-panel">
                        <h2>Customer Information</h2>

                        <div className="grid">
                            {features.map((value, index) => (
                                <div className="input-group" key={index}>
                                    <label>{labels[index]}</label>

                                    <input
                                        key={index}
                                        type="number"
                                        min="0"
                                        placeholder={labels[index]}
                                        value={value}
                                        onChange={(e) => {
                                            const value = e.target.value;

                                            if (value === "" || Number(value) >= 0) {
                                                handleChange(index, value);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "-" || e.key === "e") {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={predictRisk}
                            className="predict-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Analyzing..."
                                : "Predict Credit Risk"}
                        </button>
                    </div>

                    <div className="result-panel">
                        <h2>Risk Analysis</h2>

                        {result ? (
                            <>
                                <div className="gauge-wrapper">
                                    <div
                                        className="gauge"
                                        style={{
                                            background: `conic-gradient(
                        ${riskPercentage > 70
                                                    ? "#ef4444"
                                                    : riskPercentage > 40
                                                        ? "#f59e0b"
                                                        : "#22c55e"
                                                } ${riskPercentage * 3.6}deg,
                        #334155 0deg
                      )`,
                                        }}
                                    >
                                        <div className="gauge-inner">
                                            <h1>{riskPercentage}%</h1>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`risk-badge ${result.prediction === 1
                                        ? "high"
                                        : "low"
                                        }`}
                                >
                                    {result.prediction === 1
                                        ? "🔴 High Risk"
                                        : "🟢 Low Risk"}
                                </div>

                                <div className="analysis-card">
                                    <h3>Risk Score</h3>
                                    <p>{riskPercentage}%</p>
                                </div>

                                <div className="analysis-card">
                                    <h3>AI Recommendation</h3>

                                    <p>
                                        {result.risk_probability > 0.7
                                            ? "Applicant has a high probability of delinquency. Additional verification or collateral is recommended."
                                            : result.risk_probability > 0.4
                                                ? "Moderate risk profile. Further review is advised."
                                                : "Low risk applicant with strong repayment potential."}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="empty-state">
                                <h3>📊 Awaiting Prediction</h3>
                                <p>
                                    Fill customer details and click
                                    Predict Risk.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                theme="dark"
            />
            <Footer />
        </div>
    );
}

export default App;