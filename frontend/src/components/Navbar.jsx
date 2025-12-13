import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        StoreRatings
      </Link>

      <div className="collapse navbar-collapse show">
        <ul className="navbar-nav ms-auto align-items-center gap-2">
          {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item text-white me-2">
                {user.name} ({user.role})
              </li>

              {user.role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Dashboard</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/add-owner">Add Owner</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/add-store">Add Store</Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
