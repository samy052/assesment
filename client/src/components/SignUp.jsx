import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Login.css";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    setLoading(true);
    
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        setError(data.message || "Signup failed");
        return;
      }

      if (data.success === false) {
        setLoading(false);
        setError(data.message || "Signup failed");
        return;
      }

      setLoading(false);
      alert("Signup successful! Redirecting to login page.");
      navigate("/loginPage");
    } catch (error) {
      setLoading(false);
      setError("User already exists or network error");
      console.log(error)
    }
  };

  return (
    <>
      <div className="login-overlay">
        <div className="login-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your Name"
              required
              onChange={handleChange}
            />

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
              placeholder="Create a Password"
              required
              onChange={handleChange}
            />

            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <div className="to-second-page">
            <p>Already have an account?</p>
            <p className="second-page-link">
              <Link to="/loginPage">Log In</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
