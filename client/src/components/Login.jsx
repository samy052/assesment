import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../components/redux/Slice.js";

const Login = () => {

    const authState = useSelector((state) => state.auth);  // Log the whole auth state
    console.log('Auth State:', authState);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    // If the user is logged in, redirect them to the home page
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle non-200 responses
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/"); // Navigate to home page on successful login
    } catch (error) {
      dispatch(signInFailure(error.message || "Something went wrong"));
      alert(`Error: ${error.message || "Login failed"}`);
    }
  };

  return (
    <>
      <div className="login-overlay">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              required
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={handleChange}
            />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <div className="to-second-page">
            <p>New User?</p>
            <p className="second-page-link">
              <Link to="/signuppage">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
