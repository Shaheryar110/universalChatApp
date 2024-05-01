import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import logo from "../img/logo.png";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success("Login SuccessFull");
        })
        .catch((err) => {
          toast.err("Login Error Try Again");
        });
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <img style={{ width: "100px", height: "auto" }} src={logo} />
        {/* <span className="logo" style={{ fontFamily: "Poppins" }}>
          Chat Fusion
        </span> */}
        <span
          className="title"
          style={{ fontFamily: "Poppins", fontSize: "18px" }}
        >
          Login
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            style={{ fontFamily: "Poppins" }}
            placeholder="email"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              fontFamily: "Poppins",
            }}
          >
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="password"
            />
            <Box onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </Box>
          </div>
          <button style={{ fontFamily: "Poppins" }}>Sign in</button>
          {err && (
            <span style={{ fontFamily: "Poppins", color: "red" }}>
              Something went wrong (Try Again)
            </span>
          )}
        </form>
        <p style={{ fontFamily: "Poppins" }}>
          You don't have an account?{" "}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontFamily: "Poppins",
              fontSize: 16,
            }}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
