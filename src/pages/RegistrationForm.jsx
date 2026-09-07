import React, { useState } from "react";

const API_URL = "http://localhost:8000/registration";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

    
    const result = await res.json();   
    setMessage(result.message);        
    
    } catch (err) {
      setMessage("Server e connect kora jacche na");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-xl shadow-sm border border-neutral-200"
      >
        <h1 className="text-xl font-bold text-neutral-900 mb-6">Create account</h1>

        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="w-full px-3 py-2 mb-4 text-sm border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-900"
        />

        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-3 py-2 mb-4 text-sm border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-900"
        />

        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-3 py-2 mb-6 text-sm border border-neutral-300 rounded-md outline-none focus:ring-2 focus:ring-neutral-900"
        />

        <button
          type="submit"
          className="w-full py-2 text-sm font-semibold text-white bg-neutral-900 rounded-md hover:bg-neutral-800"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-sm text-center text-neutral-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;