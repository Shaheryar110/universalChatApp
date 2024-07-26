import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  useEffect(() => {
    const fetchMessages = async () => {
      const chatDocRef = doc(db, "chats", data.chatId);
      const chatDoc = await getDoc(chatDocRef);

      if (chatDoc.exists()) {
        const unSub = onSnapshot(chatDocRef, (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        });
        return () => {
          unSub();
        };
      } else {
        const groupDocRef = doc(db, "groups", data.chatId);
        const groupDoc = await getDoc(groupDocRef);

        if (groupDoc.exists()) {
          const unSub = onSnapshot(groupDocRef, (doc) => {
            doc.exists() && setMessages(doc.data().messages);
          });
          return () => {
            unSub();
          };
        } else {
          setMessages([]);
        }
      }
    };

    fetchMessages();
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
