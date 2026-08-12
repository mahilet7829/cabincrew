import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="bg-ink px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <span className="font-display font-bold text-paper text-lg">Crew Ready</span>
      </Link>
      <div className="flex items-center gap-2">
        {!user && (
          <>
            <Link to="/login" className="text-paper/70 hover:text-paper text-sm px-4 py-2 rounded-full transition">
              Log In
            </Link>
            <Link to="/signup" className="bg-signal text-ink text-sm font-medium px-4 py-2 rounded-full hover:bg-signal-dark transition">
              Sign Up
            </Link>
          </>
        )}
        {user && user.role === "ADMIN" && (
          <Link to="/admin" className="text-paper/70 hover:text-paper text-sm px-4 py-2 rounded-full transition">
            Admin
          </Link>
        )}
        {user && (
          <>
            <Link to="/dashboard" className="text-paper/70 hover:text-paper text-sm px-4 py-2 rounded-full transition">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-paper/70 hover:text-paper text-sm px-4 py-2 rounded-full transition"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}