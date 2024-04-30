import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { Box, Button } from "@mui/material";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search />
      <Chats />
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 99,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
        }}
      >
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
        >
          GIVE FEEDBACK
        </Button>
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
        >
          VIEW FEEDBACK
        </Button>
      </Box>
    </div>
  );
};

export default Sidebar;
