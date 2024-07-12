import React, { useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { Box, Button } from "@mui/material";
import FeedFormModal from "./FeedFormModal";
import ViewFeedBack from "./ViewFeedBack";

const Sidebar = () => {
  const [feed, setFeed] = useState(false);
  const [view, setView] = useState(false);
  const giveFeedback = () => {
    setFeed(!feed);
  };
  const viewFeedback = () => {
    setView(!view);
  };
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
          onClick={giveFeedback}
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
          onClick={viewFeedback}
        >
          VIEW FEEDBACK
        </Button>
      </Box>
      <FeedFormModal open={feed} handleClose={giveFeedback} />
      <ViewFeedBack open={view} handleClose={viewFeedback} />
    </div>
  );
};

export default Sidebar;
