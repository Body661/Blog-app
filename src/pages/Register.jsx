import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/authContext";

function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser, navigate]);

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
          `${process.env.REACT_APP_BACK_END_API}upload`,
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = async (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const img = await upload();

    try {
      await axios.post(`${process.env.REACT_APP_BACK_END_API}auth/register`, {
        ...inputs,
        img: file ? img : "",
      });
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="name"
            placeholder="Please enter your full name"
            required
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            required
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            required
            name="password"
            onChange={handleChange}
          />
          <input
            type="file"
            id="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button>Sign Up</button>
          {err && <p style={{ color: "red" }}>{err}</p>}
        </form>
        <span>
          Do have an account? <Link to="/login">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
