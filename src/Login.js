import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackToHomePageButton from "./BackToHomePageButton";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    setIsPending(true);

    try {
      const response = await fetch(
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

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      navigate("/myReservations");
    } catch (error) {
      alert("Login failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-image">
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
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

            <button
              type="submit"
              disabled={isPending || !isFormValid}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <Link to="/signUp" className="signup-link">
            Create account
          </Link>

          <BackToHomePageButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
