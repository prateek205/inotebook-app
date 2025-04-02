import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [credientials, setCredientials] = useState({ Name: "", Email: "", Password: "", confirmPassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3002/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: credientials.Name,
        Email: credientials.Email,
        Password: credientials.Password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/login");
    }
  };

  const handleOnChange = (e) => {
    setCredientials({ ...credientials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4">
      <h1 className="mb-3">Sign-Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Name
          </label>
          <input
            type="Text"
            className="form-control"
            id="Name"
            name="Name"
            value={credientials.Name}
            onChange={handleOnChange}
          />
        </div>
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
            type="password"
            className="form-control"
            id="Password"
            name="Password"
            value={credientials.Password}
            onChange={handleOnChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credientials.confirmPassword}
            onChange={handleOnChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
