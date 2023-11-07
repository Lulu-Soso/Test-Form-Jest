import React, { useState } from "react";
import axios from "axios";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrors({
        email: "Invalid email address",
      });
      return;
    }

    try {
      console.log("Sending request with data:", formData);
      const response = await axios.post(
        "http://localhost:5000/users",
        formData
      );
      console.log(response.data);
      setIsSubmitted(true);
      setSuccessMessage("Registration successful");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setErrors({
        email: "",
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      setIsSubmitted(false);
      setSuccessMessage("Registration failed");
    }
  };

  return (
    <div>
      {isSubmitted ? (
        <p style={{ color: "green" }}>{successMessage}</p>
        // <p style={{ color: "green" }}>"Registration successful"</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
