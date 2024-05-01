import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  checkDisplayEmailExist,
  checkDisplayNameExist,
} from "../Services/Users";
import toast from "react-hot-toast";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import logo from "../img/logo.png";

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function validatePassword(password) {
  // Regular expression for validating password
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;

  // Test the password against the regex pattern
  return passwordRegex.test(password);
}

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    file: "",
  });
  const navigate = useNavigate();

  const handleChange = (key, val) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleFileChange = (event) => {
    const files = event.target.files[0]; // Get the uploaded file
    // Do something with the uploaded file, e.g., save it to state or perform further processing
    setFormData((prev) => ({
      ...prev,
      file: files,
    }));
    console.log("Uploaded file:", files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { displayName, email, password, file } = formData;

    // const displayName = e.target[0].value;
    // const email = e.target[1].value;
    // const password = e.target[2].value;
    // const file = e.target[3].files[0];

    const validName = await checkDisplayNameExist(displayName);
    const validEmail = await checkDisplayEmailExist(email);
    console.log(
      displayName,
      email,
      password,
      file,
      validName,
      "displayName, email, password, file "
    );

    if (!validName) {
      if (validateEmail(email) && !validEmail) {
        if (validatePassword(password)) {
          if (file) {
            try {
              //Create user
              setLoading(true);
              const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
              );
              //Create a unique image name
              const date = new Date().getTime();
              const storageRef = ref(storage, `${displayName + date}`);

              uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                  try {
                    //Update profile
                    await updateProfile(res.user, {
                      displayName,
                      photoURL: downloadURL,
                    });
                    //create user on firestore
                    await setDoc(doc(db, "users", res.user.uid), {
                      uid: res.user.uid,
                      displayName,
                      email,
                      photoURL: downloadURL,
                    });

                    //create empty user chats on firestore
                    await setDoc(doc(db, "userChats", res.user.uid), {});

                    navigate("/");
                    toast.success("Sign Up SuccessFull");
                  } catch (err) {
                    console.log(err);
                    setErr(true);
                    setLoading(false);
                  }
                });
              });
            } catch (err) {
              setErr(true);
              setLoading(false);
            }
          } else {
            toast.error("Profile Picture Required");
            return;
          }
        } else {
          toast.error(
            "Password Length Must Be Greater Then 5 and atleast Contain one alphabet and Symbol"
          );
          return;
        }
      } else {
        toast.error("Check Email Format Or Try from different Email");
        return;
      }
    } else {
      toast.error("This Name is Already Taken try Different ");
      return;
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
          Register
        </span>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="display name"
            onChange={(e) => {
              handleChange("displayName", e.target.value);
            }}
            value={formData.displayName}
            style={{ width: "83%", fontFamily: "Poppins" }}
          />
          <input
            required
            type="email"
            placeholder="email"
            onChange={(e) => {
              handleChange("email", e.target.value);
            }}
            value={formData.email}
            style={{ width: "83%", fontFamily: "Poppins" }}
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
              onChange={(e) => {
                handleChange("password", e.target.value);
              }}
              value={formData.password}
              style={{ fontFamily: "Poppins" }}
            />
            <Box onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </Box>
          </div>

          <input
            required
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span style={{ fontFamily: "Poppins" }}>Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && (
            <span
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "Poppins",
                width: "100%",
              }}
            >
              Uploading and compressing the image please wait...
            </span>
          )}
          {err && (
            <span
              style={{
                color: "red",
                textAlign: "center",
                fontFamily: "Poppins",
              }}
            >
              Something went wrong
            </span>
          )}
        </form>
        <p style={{ fontFamily: "Poppins" }}>
          You do have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontFamily: "Poppins",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
