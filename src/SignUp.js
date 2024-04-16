import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUp extends Component {
  
  onRegister = async () => {
    const { name, email, password } = this.state;
    if (name === "") {
      this.setState({ validationError: "Invalid name" });
      return;
    }
    if (email === "") {
      this.setState({ validationError: "Invalid email" });
      return;
    }
    const response = await fetch("https://localhost:7277/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      this.setState({ validationError: "Register succeeded" });
    } else {
    }
  };

  render() {
    const { name, email, password, validationError } = this.state;

    return (
      <div className="d-flex justify-content-center align-items-center bg-image vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Sign Up</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="nameInput">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                id="nameInput"
                name="name"
                value={name}
                placeholder="Enter Name"
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                id="emailInput"
                name="email"
                value={email}
                placeholder="Enter Email"
                className="form-control rounded-0"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordInput">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                id="passwordInput"
                name="password"
                value={password}
                placeholder="Enter Password"
                className="form-control rounded-0"
              />
            </div>
            <button
              type="button"
              className="btn btn-success w-100 rounded-0"
              onClick={this.onRegister}
            >
              Sign up
            </button>
            <p>{validationError}</p>
            <p>You agree to our terms and policies</p>
            <Link
              to="/logIn"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Log in
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
