import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const App = () => {
  const [recaptchaValue, setRecaptchaValue] = useState("");

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/.netlify/functions/verifyRecaptcha", {
        recaptchaValue,
      });

      const { message } = response.data;
      console.log(message);

      // Proceed with your form submission logic here if needed
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className=" container mt-5 pt-5 ">
      <div className="mt-5 pt-5 w-50 mx-3">
        {/* Google reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6LfSvx4pAAAAAGaJXrjwrkifVb3vBs0HeKkAWKo-"
          onChange={handleRecaptchaChange}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary mt-1"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default App;
