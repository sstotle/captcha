import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const App = () => {
  const [recaptchaValue, setRecaptchaValue] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async () => {
    try {
      // Verify reCAPTCHA directly using the client-side approach
      const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=6LfSvx4pAAAAAHeWkgnbNZ1vezd-2OvArzI8PwcZ&response=${recaptchaValue}`;
      const response = await fetch(verificationURL);
      const result = await response.json();

      if (result.success) {
        setVerificationResult("reCAPTCHA verification successful");
      } else {
        setVerificationResult("reCAPTCHA verification failed");
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
