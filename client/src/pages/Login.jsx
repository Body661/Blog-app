import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { currentUser, login } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            required
            onChange={handleChange}
            name="email"
          />
          <input
            type="password"
            placeholder="password"
            required
            onChange={handleChange}
            name="password"
          />
          <button>Sign In</button>
          {err && <p style={{ color: "red" }}>{err}</p>}
        </form>
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
