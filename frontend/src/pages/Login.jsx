import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid Login");
    }
  };

  return (
    <div className="authPage">

      {/* LEFT SIDE */}
      <div className="leftSide">
        <h1>🧪 Lab Equipment</h1>
        <p>
          Modern Laboratory Equipment Borrowing & Management System
        </p>

        <div className="glowCircle"></div>
      </div>

      {/* LOGIN CARD */}
      <div className="loginCard">

        <h2>Welcome Back</h2>
        <span>Sign in to continue</span>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p className="defaultText">
          Default : admin / 1234
        </p>

      </div>

    </div>
  );
}