// functions/verifyRecaptcha.js
const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const { recaptchaValue } = JSON.parse(event.body);

    const verificationURL = `https://www.google.com/recaptcha/api/siteverify`;
    const response = await axios.post(verificationURL, null, {
      params: {
        secret: "6LfSvx4pAAAAAHeWkgnbNZ1vezd-2OvArzI8PwcZ", // Replace with your reCAPTCHA secret key
        response: recaptchaValue,
      },
    });

    const { success } = response.data;

    if (success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "reCAPTCHA verification successful" }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "reCAPTCHA verification failed" }),
      };
    }
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server errors" }),
    };
  }
};
