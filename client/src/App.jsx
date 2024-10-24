import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/loginpage" element={<Login />} />
          <Route path="/signuppage" element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
