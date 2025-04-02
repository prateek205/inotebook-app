import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credientials, setCredientials] = useState({ Email: "", Password: "" });
    let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3002/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: credientials.Email,
        Password: credientials.Password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token', json.authToken)
        navigate("/")
    }else{
        alert("Invalid Credientials")
    }
  };

  const handleOnChange = (e) => {
    setCredientials({ ...credientials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <h1 className="mb-3">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            name="Email"
            aria-describedby="emailHelp"
            value={credientials.Email}
            onChange={handleOnChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="current-password"
            className="form-control"
            id="Password"
            name="Password"
            value={credientials.Password}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
