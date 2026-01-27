import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackToHomePageButton from "./BackToHomePageButton";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isFormValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsPending(true);
    setError("");

    try {
      const registerResponse = await fetch(
        "https://localhost:7277/api/Users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
          }),
        }
      );

      if (!registerResponse.ok) {
        throw new Error("Register failed");
      }

      const loginResponse = await fetch(
        "https://localhost:7277/api/Users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || "Login failed");
      }

      localStorage.setItem("token", loginData.token);
      navigate("/myReservations");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-image">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error-text">{error}</p>}

            <button type="submit" disabled={isPending || !isFormValid}>
              {isPending ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <Link to="/logIn" className="switch-link">
            Already have an account?
          </Link>

          <BackToHomePageButton />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
