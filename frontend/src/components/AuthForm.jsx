import React, { useState } from "react";
import "./AuthForm.css";

const AuthForm = ({ role, isRegister, onAuthSuccess, onToggleMode }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const URL = "http://localhost:5000";

    try {
      if (isRegister) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const res = await fetch(`${URL}/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            role,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          setError(data.message);
          return;
        }

        alert("Signup successful! Please login.");
        onToggleMode(); // switch to login
      } else {
        const res = await fetch(`${URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
            role,
          }),
        });

        const data = await res.json();

        if (!data.success) {
          setError(data.message);
          return;
        }

        sessionStorage.setItem("token", data.token);

        onAuthSuccess({
          username: formData.username,
          role: role,
        });
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isRegister ? `Register as ${role}` : `Login as ${role}`}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          {isRegister && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
          )}

          {error && <p className="auth-error">{error}</p>}

          <button className="auth-button" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="toggle-mode">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <span onClick={onToggleMode}>
            {isRegister ? " Login" : " Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
