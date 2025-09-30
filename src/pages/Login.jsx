import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate login process
    // In a real app, you would make an API call here
    console.log("Login attempt with:", { email, password });

    // For demo purposes, we'll just navigate to home page
    // In a real app, you would handle authentication response
    alert("Login successful! Redirecting to home page.");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="checkout__order" style={{ marginTop: "50px" }}>
            <h4>Login to Your Account</h4>
            <div className="checkout__order__products">
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>
                <button
                  type="submit"
                  className="site-btn"
                  style={{ marginTop: "20px" }}
                >
                  Login
                </button>
              </form>
              <div
                className="checkout__order__products"
                style={{ marginTop: "20px" }}
              >
                <p>
                  Don't have an account?{" "}
                  <Link to="/register">Register here</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
