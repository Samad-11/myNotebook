import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  const initialCredentials = { email: "", password: "" };

  const [credentials, setCredential] = useState(initialCredentials);
  let { email, password } = credentials;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = host + "/api/auth/login";
    const response = await fetch(url, {
      method: "post", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    // console.log(json);
    if (json.success) {
        localStorage.setItem('token',json.userToken);
        navigate('/')
        
    }else{
        alert("Invalid Credentials...")
    }
  };
  const onClick = (e) =>{
    setCredential({...credentials, [e.target.name] : e.target.value});
  }
  return (
    <>
      <div className="wrapper">
        {/* <div className="logo">
            <img src="" alt=""/>
        </div> */}
        <div className="text-center mt-4 name">myNotes</div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Email"
              onChange={onClick}
              required
            />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
              onChange={onClick}
              required
            />
          </div>
          <button type="submit" className="btn mt-3">
            Login
          </button>
        </form>
        <div className="text-center fs-6">
          <a href="/" style={{"pointerEvents": "none"}}>Forget password?</a> or <a href="/signup">Sign Up</a>
        </div>
      </div>
    </>
  );
};

export default Login;
