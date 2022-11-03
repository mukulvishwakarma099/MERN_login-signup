// import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:9002/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await JSON.stringify({
        name,
        email,
        password,
        phone,
      }),
    });

    const data = await req.json();

    if (data.status === "ok") {
      navigate("/login");
    } else {
      alert("duplicate email");
    }
  };

  return (
    <div className="login">
      <h1>Register</h1>
      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="number"
          value={phone}
          placeholder="Enter phone number"
          maxLength={10}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input className="button" type="submit" />

        <div>or</div>
      </form>
      <button className="button" onClick={() => navigate("/login")}>
        Login
      </button>
    </div>
  );
};

export default Register;
