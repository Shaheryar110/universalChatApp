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
        <span>just now</span>
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
