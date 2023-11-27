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
      const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=6LfSvx4pAAAAAHeWkgnbNZ1vezd-2OvArzI8PwcZ&response=${recaptchaValue}`;
      const response = await axios.post(verificationURL);

      const { success } = response.data;

      if (success) {
        setVerificationResult("reCAPTCHA verification successful");
        // You can proceed with your form submission logic here
      } else {
        setVerificationResult("reCAPTCHA verification failed");
      }
    } catch (error) {
      console.error("reCAPTCHA verification error:", error);
      setVerificationResult("Internal server error 1");
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
