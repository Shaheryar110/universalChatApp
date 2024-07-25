import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { sendFeedback } from "../Services/Users";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(255,255,255,0.4)",
  border: "2px solid #000",
  boxShadow: 24,
  backdropFilter: "blur(4px)",
  p: 6,
  color: "white",
  borderRadius: "1rem",
};

const FeedFormModal = ({ open, handleClose }) => {
  const [formValues, setFormValues] = useState({
    email: "",
    message: "",
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormValues({
      ...formValues,
      rating: newValue,
    });
  };

  const handleSubmit = async () => {
    const { email, message } = formValues;
    if (email && message) {
      let temp = {
        date: Date.now(),
        formValues,
      };
      console.log(temp, "temp");
      let done = await sendFeedback(temp);

      if (done) {
        toast.success("Feedback Submitted");
        setFormValues({
          email: "",
          message: "",
          rating: 5,
        });
        handleClose();
      } else {
        toast.error("Feedback not Submitted");
        handleClose();
      }
    }
  };

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
            sx={{ fontWeight: 600, fontFamily: "Poppins" }}
          >
            Send Us Review
          </Typography>
          <HighlightOffIcon className="icon" onClick={handleClose} />
        </Box>
        <Typography
          id="modal-modal-description"
          sx={{ fontFamily: "Poppins", fontSize: 14, mt: -1 }}
        >
          Give us your valuable feedback Thank You.
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            marginTop: "10px",
          }}
        >
          <Typography
            sx={{ width: "100%", marginBottom: "-10px", fontFamily: "Poppins" }}
          >
            Email
          </Typography>
          <input
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            style={{
              background: "transparent",
              border: "1px solid white",
              borderRadius: "15px",
              color: "white",
              width: "90%",
              fontFamily: "Poppins",
              padding: "1rem",
            }}
          />
          {/* <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            rows={5}
            name="message"
            value={formValues.message}
            onChange={handleChange}
            multiline
            sx={{ width: "100%" }}
          /> */}
          <Typography
            sx={{ width: "100%", marginBottom: "-10px", fontFamily: "Poppins" }}
          >
            Message
          </Typography>
          <textarea
            value={formValues.message}
            onChange={handleChange}
            name="message"
            placeholder="Message"
            style={{
              background: "transparent",
              border: "1px solid white",
              borderRadius: "15px",
              color: "white",
              width: "90%",
              height: "300px",
              padding: "1rem",
              fontFamily: "Poppins",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography sx={{ fontFamily: "Poppins" }}>Rate Us :</Typography>
            <Rating
              name="simple-controlled"
              value={formValues.rating}
              onChange={handleRatingChange}
            />
          </Box>
          <Button
            sx={{
              fontFamily: "Poppins",
              color: "white",

              background: "#276051",
              transition: "all ease-out 0.5s",
              paddingX: "50px",
              borderRadius: "20px",
              ":hover": {
                background: "#498072",
              },
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FeedFormModal;
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
