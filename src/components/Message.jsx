import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const formatTimestamp = (timestamp) => {
    const date = new Date(
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
    );
    const today = new Date();

    // Check if the date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // 12-hour format with AM/PM
      };
      return date.toLocaleTimeString(undefined, timeOptions);
      // If date is today, return formatted date
    } else {
      // If not today, return formatted time
      const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString(undefined, dateOptions);
    }
  };
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formatTimestamp(message?.date)}</span>
      </div>
      <div className="messageContent">
        {!message.img && <p>{message.content}</p>}
        {message.img && <img src={message.img} alt="" />}
        {/* <div
          style={{
            dislay: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:
              message.senderId === currentUser.uid ? "start" : "end",
            gap: "10px",
            marginTop: "14px",
          }}
        >
          <FaRegThumbsUp style={{ color: "white", marginRight: "10px" }} />
          <FaRegThumbsDown style={{ color: "white" }} />
        </div> */}
      </div>
    </div>
  );
};

export default Message;
