import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import logo from "../img/logo.png";
import { ChatContext } from "../context/ChatContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [groups, setGroups] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };
  const handleSelectGroup = (group) => {
    dispatch({
      type: "CHANGE_GROUP",
      payload: {
        groupId: group.id,
        groupName: group.groupName,
      },
    });
  };
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userDoc = await getDoc(doc(db, "userGroups", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const fetchedGroups = [];
          Object.keys(data).forEach((key) => {
            if (data[key].groupInfo) {
              fetchedGroups.push(data[key].groupInfo);
            }
          });
          setGroups(fetchedGroups);
        }
      } catch (err) {
        setErr(true);
        console.error("Error fetching groups: ", err);
      }
    };

    fetchGroups();
  }, [currentUser.uid]);

  return (
    <div className="search">
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          placeholder="Find  user by user name"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Find user by user name</label>
        <div className="req-mark">!</div>
      </div>
      {err && (
        <span style={{ color: "white", fontFamily: "Poppins", fontSize: 18 }}>
          User not found!
        </span>
      )}
      {groups &&
        groups?.length > 0 &&
        groups?.map((group, index) => (
          <div
            key={index}
            className="userChatResponse"
            onClick={() => {
              handleSelectGroup(group);
            }}
          >
            <img src={logo} alt="" />
            <div className="userChatInfo">
              <span>{group?.groupName}</span>
            </div>
          </div>
        ))}
      {user && (
        <div className="userChatResponse" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
