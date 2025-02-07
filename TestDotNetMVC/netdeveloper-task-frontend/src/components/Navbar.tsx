import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken, logout } from "../services/authService";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!getToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Product Manager
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/create">Add Product</Link></li>
                <li className="nav-item"><button className="btn btn-danger" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
