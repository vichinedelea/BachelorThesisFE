import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackToHomePageButton from "./BackToHomePageButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const response = await fetch(
        "https://localhost:7277/api/Users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        }
      );

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();

      localStorage.setItem("token", data.token);
      setIsPending(false);
      navigate("/myReservations");
    } catch (err) {
      alert("Login failed");
      setIsPending(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign In</h2>

        <form onSubmit={handleSubmit}>
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

          {/* <button className="btn btn-success w-100" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button> */}

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={isPending}
            onClick={() => console.log("BUTTON CLICKED")}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

        </form>

        <Link to="/signUp" className="btn btn-light w-100 mt-2">
          Create account
        </Link>

        <BackToHomePageButton />
      </div>
    </div>
  );
};

export default Login;
