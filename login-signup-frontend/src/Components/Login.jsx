import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const req = await fetch("http://localhost:9002/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: await JSON.stringify({
        email,
        password,
      }),
    });

    const data = await req.json();

    if (data.status === "ok") {
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert("wrong email and password");
    }
  };

  // const redirect = () => {

  // }

  return (
    <div className="login">
      <h1>Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <input className="button" type="submit" value="Login" />

        <div>or</div>
      </form>
      <button className="button" onClick={() => navigate("/")}>
        Register
      </button>
    </div>
  );
};

export default Login;
