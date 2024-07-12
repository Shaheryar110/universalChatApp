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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 6,
};

const FeedFormModal = ({ open, handleClose }) => {
  const { currentUser } = useContext(AuthContext);
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
          <TextField
            id="outlined-basic"
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <TextField
            id="outlined-basic"
            label="Message"
            variant="outlined"
            rows={5}
            name="message"
            value={formValues.message}
            onChange={handleChange}
            multiline
            sx={{ width: "100%" }}
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
