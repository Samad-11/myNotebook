import { Link, json, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="row navbar navbar-expand-lg navbar-secondary bg-secondary fixed-top " >
      <div className="container-fluid ">
        <Link className="navbar-brand" to="/">
          myNoteBook
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" && "active"}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" && "active"
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {localStorage.getItem("user") ? (
            <div className="text-white text-center mx-5">
              <big className="text-warning  fs-3">Hey, </big>
              {localStorage.getItem("user")}
            </div>
          ) : (
            " "
          )}
          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link
                to="/login"
                className="btn btn-primary btn-sm mx-1"
                role="button"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-secondary btn-sm mx-1"
                role="button"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger btn-sm">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
