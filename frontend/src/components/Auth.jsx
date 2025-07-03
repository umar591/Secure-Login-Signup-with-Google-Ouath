import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // ✅ Correct import path for useAuth

export default function AuthForm({ type }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Destructure login from context

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "signup" && !form.name.trim()) {
      return toast.error("Name is required");
    }
    if (!form.email.trim()) {
      return toast.error("Email is required");
    }
    if (!form.password.trim()) {
      return toast.error("Password is required");
    }

    const url =
      type === "login"
        ? `${import.meta.env.VITE_API_BASE_URL}/auth/login`
        : `${import.meta.env.VITE_API_BASE_URL}/auth/signup`;

    try {
      const res = await axios.post(url, form);
      toast.success(`${type === "login" ? "Login" : "Signup"} successful!`);
      resetForm();

      if (type === "login") {
        login(res.data.token); // ✅ Login with token
        navigate("/home");
      }
    } catch (err) {
      console.error(`${type} error`, err);
      const msg =
        err?.response?.data?.message ||
        `${type === "login" ? "Login" : "Signup"} failed!`;
      toast.error(msg);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const tokenId = response.credential;
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google-login`,
        { tokenId }
      );
      toast.success("Google login successful");

      resetForm();
      login(res.data.token); // ✅ Login with Google token
      navigate("/home");
    } catch (err) {
      console.error("Google login error", err);
      toast.error(err?.response?.data?.message || "Google login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        {type === "login" ? "Log In" : "Sign Up"}
      </h2>

      <div className="w-full mb-6 flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google login failed")}
        />
      </div>

      <div className="flex items-center mb-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-400 text-sm">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {type === "signup" && (
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
        />
      )}

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        className="mb-4 w-full p-2 border rounded"
      />

      <input
        name="password"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={handleChange}
        className="mb-6 w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {type === "login" ? "Log In" : "Sign Up"}
      </button>
    </form>
  );
}
