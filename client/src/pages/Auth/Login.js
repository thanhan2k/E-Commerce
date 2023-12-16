import React, { useState } from "react";

const Login = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện logic đăng nhập ở đây (ví dụ: gọi API để xác thực người dùng).
    console.log("Login Data:", formData);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <p>
          Don't have an account?{" "}
          <button type="button" onClick={onSwitch}>
            Switch to Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
