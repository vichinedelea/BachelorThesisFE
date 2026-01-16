import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackToHomePageButton from "./BackToHomePageButton";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      // 1️⃣ REGISTER
      const registerResponse = await fetch(
        "https://localhost:7277/api/Users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password })
        }
      );

      if (!registerResponse.ok)
        throw new Error("Register failed");

      // 2️⃣ LOGIN AUTOMAT
      const loginResponse = await fetch(
        "https://localhost:7277/api/Users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      if (!loginResponse.ok)
        throw new Error("Login failed");

      const data = await loginResponse.json();

      // 3️⃣ SALVARE TOKEN
      localStorage.setItem("token", data.token);

      // 4️⃣ REDIRECT
      navigate("/myReservations");
    } catch (err) {
      alert("Sign up failed");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isPending}
            onClick={() => console.log("BUTTON CLICKED")}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link to="/logIn" className="btn btn-light w-100 mt-2">
          Already have an account
        </Link>

        <BackToHomePageButton />
      </div>
    </div>
  );
};

export default SignUp;
