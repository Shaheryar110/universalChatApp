import { Box, Modal, Rating, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { allFeedBacks } from "../Services/Users";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#276051",
  boxShadow: 24,
  p: 4,
  height: "70%",
  overflowY: "scroll",
  scrollbarWidth: "thin", // for Firefox
  scrollbarColor: "#498072 #e4e4e4", // for Firefox
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#498072",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d4aa70",
    borderRadius: "10px",
    border: "3px solid #498072",
  },
};
const ViewFeedBack = ({ open, handleClose }) => {
  const [all, setAll] = useState([]);

  const data = async () => {
    try {
      let dataFeed = await allFeedBacks();
      if (dataFeed) {
        console.log(dataFeed, "dataFeed");
        setAll(dataFeed);
      }
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    data();
  }, [open]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={styles.flex}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 600, fontFamily: "Poppins", color: "white" }}
          >
            Feedbacks
          </Typography>
          <HighlightOffIcon className="icon" onClick={handleClose} />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {all &&
            all?.length > 0 &&
            all?.map((data, index) => {
              return (
                <>
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      p: 3,
                      borderRadius: "13px",
                      background: "#498072",
                      boxShadow: 4,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        color: "white",
                        fontWeight: "600",
                        fontSize: 13,
                      }}
                    >
                      {data?.formValues?.email}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        color: "white",
                        fontWeight: "600",
                        fontSize: 13,
                      }}
                    >
                      {new Date(data?.date).toLocaleDateString()}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        color: "white",
                        fontWeight: "600",
                        fontSize: 13,
                        marginTop: "10px",
                      }}
                    >
                      {data?.formValues?.message}
                    </Typography>
                    <Rating
                      name="size-small"
                      size="small"
                      value={data?.formValues?.rating}
                    />
                  </Box>
                </>
              );
            })}
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewFeedBack;
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
