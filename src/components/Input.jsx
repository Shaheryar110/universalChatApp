import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import toast from "react-hot-toast";
import axios from "axios";
import MoodIcon from "@mui/icons-material/Mood";

const Input = ({ cc }) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text.length > 0) {
      const options = {
        method: "GET",
        url: "https://nlp-translation.p.rapidapi.com/v1/translate",
        params: {
          text: text,
          to: cc,
          from: "en",
        },
        headers: {
          "X-RapidAPI-Key":
            "bb0665451amsh975e1775ed50fe0p16feeajsnb7a25ae97850",
          "X-RapidAPI-Host": "nlp-translation.p.rapidapi.com",
        },
      };
      setLoading(true);
      // const response = await fetch("https://tx-cc.com:3001/api/translate", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Add other headers if required
      //   },
      //   body: JSON.stringify({
      //     lng: cc,
      //     text: text,
      //   }),
      // });
      const response = await axios.request(options);

      let content = response.data.translated_text[cc];
      // console.log(response.data.translated_text[cc], "content outside", cc);
      // console.log(await response.json(), "response");
      if (content) {
        console.log(content, "content");
        if (img) {
          const storageRef = ref(storage, uuid());

          const uploadTask = uploadBytesResumable(storageRef, img);

          uploadTask.on(
            (error) => {
              //TODO:Handle Error
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                async (downloadURL) => {
                  await updateDoc(doc(db, "chats", data.chatId), {
                    messages: arrayUnion({
                      id: uuid(),
                      content,
                      senderId: currentUser.uid,
                      date: Timestamp.now(),
                      img: downloadURL,
                    }),
                  });
                }
              );
            }
          );
        } else {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              content,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            content,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            content,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");
        setImg(null);
        setLoading(false);
        toast.success("Message Sent Successfully");
      }
    }
    if (!text.length > 0 && img) {
      setLoading(true);
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                content: "",
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
      setLoading(false);
      toast.success("Message Sent Successfully");
    }
  };
  return (
    <>
      <div className="input">
        <MoodIcon
          sx={{ fill: "black", opacity: 0.5, fontSize: 35, marginRight: "8px" }}
        />

        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="send">
          {/* <img src={Attach} alt="" /> */}
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img style={{ width: "40px", height: "auto" }} src={Img} alt="" />
          </label>
          <button
            style={{
              borderRadius: "5px",
              fontSize: "16px",
              fontFamily: "Poppins",
            }}
            onClick={handleSend}
          >
            {loading ? "Wait.." : "Send"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Input;
