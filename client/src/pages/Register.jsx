import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// ...existing code...

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // "user" or "admin"
    secret: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitData = { ...formData };
    // If user selects admin, check secret key
    if (formData.role === "admin") {
      if (formData.secret !== `${import.meta.env.ADMIN_SECRET}`) {
        alert("Invalid secret key for admin registration.");
        return;
      }
    } else {
      
      submitData.role = "user";
    }
    
    try {
      const res = await axios.post("/api/auth/register", submitData);
      if (res.data && res.data.success !== false) {
        alert("Registered successfully. Please login.");
        navigate("/login"); 
      } else {
        throw new Error(res.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err.response || err.message || err);
      alert(
        "Registration failed: " + (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
        />
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
        <select
          name="role"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={handleChange}
          required
          value={formData.role}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {formData.role === "admin" && (
          <input
            type="text"
            name="secret"
            placeholder="Enter admin secret key"
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={handleChange}
            value={formData.secret}
            required
          />
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition mt-4 font-semibold shadow"
        >
          Register
        </button>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <span
            className="text-indigo-600 hover:underline font-semibold cursor-pointer"
            onClick={() => navigate("/login")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/login");
            }}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
