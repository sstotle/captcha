import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const App = () => {
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params: {
            secret: "6LfSvx4pAAAAAHeWkgnbNZ1vezd-2OvArzI8PwcZ",
            response: recaptchaValue,
          },
        }
      );

      if (response.data.success) {
        setVerificationResult("reCAPTCHA verification successful");
      } else {
        setVerificationResult(
          `reCAPTCHA verification failed. Error codes: ${response.data[
            "error-codes"
          ].join(", ")}`
        );
      }
    } catch (error) {
      console.error("Error verifying reCAPTCHA:", error);
      setVerificationResult("Internal server error");
    }
  };

  return (
    <div>
      <h1>React App with reCAPTCHA</h1>

      {/* Google reCAPTCHA */}
      <ReCAPTCHA
        sitekey="6LfSvx4pAAAAAGaJXrjwrkifVb3vBs0HeKkAWKo-"
        onChange={handleRecaptchaChange}
      />

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>

      {/* Display verification result */}
      <p>{verificationResult}</p>
    </div>
  );
};

export default App;
