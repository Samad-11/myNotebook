import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = credentials;
  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = host + "/api/auth/createUser";
    const response = await fetch(url, {
      method: "post", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name , email, password}),
    });
    const json = await response.json();
    // console.log('this',json);
    if (json.success) {
      localStorage.setItem("token", json.userToken);
      navigate("/");
    } else {
      alert("Invalid Credentials...");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="row my-5">
      <h2 className="text-center my-5 col-md-6 ">Sign Up Here</h2>
      <form className="col-md-6" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
