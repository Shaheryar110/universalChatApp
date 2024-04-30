import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chat Fusion</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() =>
            signOut(auth).then(() => {
              toast.success("Sign Out Successfully");
            })
          }
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
