import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    alert(data.message);

    if (data.message === "Signup successful") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/"); // go to home page after signup
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create Account</h2>

        <input placeholder="Full Name" />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Sign Up</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
