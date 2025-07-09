import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuthInfo } from "../utils/auth";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      const { token, user } = res.data;
      // Extract role and username from user object
      const role = user?.role;
      const username = user?.username || user?.name || "";
      setAuthInfo({ token, role, username });

      alert("Login successful");

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/explore");
      }
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition mt-4 font-semibold shadow"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Not registered?{" "}
          <a
            href="/register"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
