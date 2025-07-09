import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const userRole = localStorage.getItem("role");
      if (token) {
        setIsLoggedIn(true);
        setRole(userRole);
      } else {
        setIsLoggedIn(false);
        setRole("");
      }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    const handleAuthEvent = () => checkAuth();
    window.addEventListener("authChanged", handleAuthEvent);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChanged", handleAuthEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole("");
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-white">
        NeighborFit
      </Link>
      <div className="flex gap-4 items-center">
        <Link
          to="/explore"
          className="text-white hover:underline font-semibold"
        >
          Explore
        </Link>
        <Link
          to="/chatbot"
          className="text-white hover:underline font-semibold"
        >
          Chatbot
        </Link>
        {!isLoggedIn && (
          <>
            <Link
              to="/register"
              className="text-white hover:underline font-semibold"
            >
              Register
            </Link>
            <Link to="/" className="text-white hover:underline font-semibold">
              Login
            </Link>
          </>
        )}
        {isLoggedIn && role === "admin" && (
          <>
            <Link
              to="/admin"
              className="text-white hover:underline font-semibold"
            >
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 font-bold px-3 py-1 rounded hover:bg-blue-100"
            >
              Logout
            </button>
          </>
        )}
        {isLoggedIn && role !== "admin" && (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 font-bold px-3 py-1 rounded hover:bg-blue-100"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
