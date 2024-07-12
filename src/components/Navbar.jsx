import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CountryCode } from "../Constant/code";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import LoginIcon from "@mui/icons-material/Login";
import AddIcon from "@mui/icons-material/Add";
import logo from "../img/logo.png";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { getUserById, updatelanguage, updateUser } from "../Services/Users";
import LanguageIcon from "@mui/icons-material/Language";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const { currentUser, setBaseLanguage, setCurrentUser } =
    useContext(AuthContext);
  const [user, setUser] = useState();

  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [lang, setLang] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  const toggleLang = () => {
    setLang(!lang);
  };

  const handleProfileDiagelog = () => {
    setOpenProfile(!openProfile);
  };

  const handleProfileChange = (name, val) => {
    setUser((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const changeBaseLangauge = async (val) => {
    setBaseLanguage(val);
    let data = await updatelanguage(val, user?.uid);
    if (data) {
      toast.success("Language Updated Successfully");
      setLang(false);
    } else {
      toast.error("Language went wrong");
      setLang(false);
    }
  };

  const updateProfile = async () => {
    let data = await updateUser(user, user?.uid);
    if (data) {
      toast.success("Profile Updated Successfully");
      let curUser = await getUserById(user?.uid);
      setCurrentUser(curUser);
      setOpenProfile(false);
    } else {
      toast.error("Something went wrong");
    }
  };

  const getData = async () => {
    let data = await getUserById(currentUser?.uid);
    setBaseLanguage(data?.baseLanguage);
    setUser(data);
  };

  useEffect(() => {
    if (currentUser) {
      getData();
    }
  }, [currentUser]);

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
                height: "150px",
                width: "250px",
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
                onClick={handleProfileDiagelog}
              >
                <BadgeIcon style={{ fill: "black" }} /> Update Profile
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
                onClick={toggleLang}
              >
                <LanguageIcon style={{ fill: "black" }} /> Change Language
              </Typography>
              {/* <Typography
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
              </Typography> */}
              {/* <Typography
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
              </Typography> */}
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

        <Modal
          open={openProfile}
          onClose={handleProfileDiagelog}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} onMouseDown={(e) => e.stopPropagation()}>
            <Box sx={styles.flex}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ fontWeight: 600, fontFamily: "Poppins" }}
              >
                Profile
              </Typography>
              <HighlightOffIcon
                className="icon"
                onClick={handleProfileDiagelog}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <Avatar
                alt={user?.displayName}
                src={user?.photoURL}
                sx={{ width: 86, height: 86 }}
              />
              <TextField
                label="Display Name"
                variant="outlined"
                sx={{ width: "100%" }}
                value={user?.displayName}
                onChange={(e) => {
                  handleProfileChange("displayName", e.target.value);
                }}
              />
              <TextField
                label="Email (You Can Not Change it)"
                disabled
                variant="outlined"
                sx={{ width: "100%" }}
                value={user?.email}
                onChange={(e) => {
                  handleProfileChange("email", e.target.value);
                }}
              />

              <Button
                sx={{
                  fontFamily: "Poppins",
                  color: "white",

                  background: "#276051",
                  transition: "all ease-out 0.5s",
                  ":hover": {
                    background: "#498072",
                  },
                }}
                variant="contained"
                onClick={updateProfile}
              >
                UPDATE
              </Button>
            </Box>
          </Box>
        </Modal>
        <Dialog open={lang} onClose={toggleLang}>
          <DialogTitle>Select Appropiate Language</DialogTitle>
          <Box sx={{ padding: "1rem 3rem 2rem", width: "400px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Base Language
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Base Language"
                value={user?.baseLanguage}
                onChange={(e) => {
                  changeBaseLangauge(e.target.value);
                }}
              >
                {CountryCode.map((data, index) => (
                  <MenuItem key={index} value={data.code}>
                    {data.language} ({data.code})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Dialog>
      </div>
    </div>
  );
};

export default Navbar;
const styles = {
  flex: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
};
