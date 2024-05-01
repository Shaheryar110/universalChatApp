import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Typography } from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import LoginIcon from "@mui/icons-material/Login";
import AddIcon from "@mui/icons-material/Add";
import logo from "../img/logo.png";
const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
    console.log("clicked", open);
  };

  return (
    <div className="navbar">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img src={logo} alt="" style={{ width: "40px", height: "auto" }} />
        <span className="logo">Chat Fusion</span>
      </div>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span style={{ fontFamily: "Poppins", fontSize: 18, fontWeight: 600 }}>
          {currentUser.displayName}
        </span>
        <Box sx={{ position: "relative" }}>
          <MoreVertIcon sx={{ color: "white" }} onClick={toggle} />
          {open && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "white",
                boxShadow: 5,
                height: "170px",
                width: "220px",
                borderRadius: "12px",
                padding: "15px",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: 1,
                transform: "translateY(0)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: "Poppins",
                  paddingY: "7px",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  paddingX: "10px",
                  transition: "all ease-out 0.3s",
                  ":hover": {
                    background: "#E3E1D9",
                    fontWeight: 600,
                  },
                }}
              >
                <BadgeIcon style={{ fill: "black" }} /> Profile
              </Typography>
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: "Poppins",
                  paddingY: "7px",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  paddingX: "10px",
                  transition: "all ease-out 0.3s",
                  ":hover": {
                    background: "#E3E1D9",
                    fontWeight: 600,
                  },
                }}
              >
                <AutoFixHighIcon style={{ fill: "black" }} /> Update Profile
              </Typography>
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: "Poppins",
                  paddingY: "7px",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  paddingX: "10px",
                  transition: "all ease-out 0.3s",
                  ":hover": {
                    background: "#E3E1D9",
                    fontWeight: 600,
                  },
                }}
              >
                <AddIcon style={{ fill: "black" }} /> Create Group
              </Typography>
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: "Poppins",
                  paddingY: "7px",
                  color: "black",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  paddingX: "10px",
                  transition: "all ease-out 0.3s",
                  ":hover": {
                    background: "#E3E1D9",
                    fontWeight: 600,
                  },
                }}
                onClick={() =>
                  signOut(auth).then(() => {
                    toast.success("Sign Out Successfully");
                  })
                }
              >
                <LoginIcon style={{ fill: "black" }} /> Logout
              </Typography>
            </Box>
          )}
        </Box>

        {/* <button
          onClick={() =>
            signOut(auth).then(() => {
              toast.success("Sign Out Successfully");
            })
          }
        >
          logout
        </button> */}
      </div>
    </div>
  );
};

export default Navbar;
