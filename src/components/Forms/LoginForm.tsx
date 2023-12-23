import React, { useState, FormEvent, useEffect } from "react";
import "./Form.css";
import Toast from "../ui/Toast";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await login({
        username,
        password,
      });
      localStorage.setItem("auth-token", token);
      window.location.href = "/";
      setToastMessage("Login successful");
      setToastType("success");
      setShowToast(true);
    } catch (error: any) {
      setToastMessage(error.message);
      setToastType("error");
      setShowToast(true);
    } finally {
      setTimeout(() => {
        setShowToast(false);
        setLoading(false);
      }, 1000);
    }
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.token;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  return (
    <section className="container flex justify-center items-center full-screen">
      <div className="box">
        <h2 className="box-title">Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username:</label>
          <input
            aria-label="username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            aria-label="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit" className="btn btn-login" disabled={loading}>
            Login
          </button>
        </form>
        <Toast
          message={toastMessage}
          type={toastType}
          title="Login"
          hide={showToast ? "show" : "hide"}
        />
      </div>
    </section>
  );
};

export default LoginForm;
