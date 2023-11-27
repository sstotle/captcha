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
      const response = await axios.post("/.netlify/functions/verifyRecaptcha", {
        recaptchaValue,
      });

      const { message } = response.data;
      setVerificationResult(message);

      // Proceed with your form submission logic here if needed
    } catch (error) {
      console.error("Error submitting form:", error);
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
