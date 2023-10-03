import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="row my-5">
      <h2 className="text-center my-5">Page Not Found</h2>
      <h5 className="text-danger text-center my-5">404</h5>
      <p className="text-center"><Link to='/' className="fs-2 my-5">Go to home page</Link></p>
    </div>
  );
};

export default Error;
