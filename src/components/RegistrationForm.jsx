import React, { useEffect, useState } from "react";
import axios from "axios";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password,
    };

    const resetFormFields = () => {
      setUsername("");
      setEmail("");
      setPassword("");
    };

    try {
      console.log("Sending request with data:", data);
      const response = await axios.post("http://localhost:5000/users", data);
      console.log(response.data);
      // est généralement une convention pour indiquer que la requête a réussi
      if (response.data === "Success") { 
        setIsSubmitted(true);
      }
      resetFormFields();
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const getDataFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      console.log("Data from server:", response.data);
    } catch (error) {
      console.error("Error fetching data from server:", error);
    }
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  return (
    <div>
      {isSubmitted ? (
        <p>Registration successful</p>

      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default RegistrationForm;
