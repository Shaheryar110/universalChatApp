import {
  Box,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Chip,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const CreateGroupModal = ({ close, open, allUsers }) => {
  const [groupName, setGroupName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [error, setError] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredUsers([]);
      return;
    }

    try {
      const results = allUsers.filter((user) =>
        user?.displayName?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(results);
    } catch (err) {
      setError(true);
      console.error("Error filtering users: ", err);
    }
  };

  const handleUserSelect = (user) => {
    // Add user to groupMembers if not already added
    setGroupMembers((prevMembers) => {
      if (prevMembers.find((member) => member.uid === user.uid)) {
        return prevMembers; // User already in the list
      }
      return [...prevMembers, user];
    });
  };
  const handleUserDeselect = (uid) => {
    setGroupMembers((prevMembers) =>
      prevMembers.filter((member) => member.uid !== uid)
    );
  };
  const handleCreateGroup = async () => {
    const groupId = uuidv4(); // Generate a unique group ID

    try {
      const res = await getDoc(doc(db, "groups", groupId));

      if (!res.exists()) {
        // Create a new group in the groups collection
        await setDoc(doc(db, "groups", groupId), {
          groupName: groupName,
          members: [
            {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            ...groupMembers.map((member) => ({
              uid: member.uid,
              displayName: member.displayName,
              photoURL: member.photoURL,
            })),
          ],
          date: serverTimestamp(),
          messages: [], // Initialize with an empty messages array
        });

        // Helper function to ensure user document exists
        const ensureUserDocument = async (userId) => {
          const userDocRef = doc(db, "userGroups", userId);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            await setDoc(userDocRef, {});
          }
        };

        // Ensure documents exist for currentUser and all group members
        await ensureUserDocument(currentUser.uid);
        for (const member of groupMembers) {
          await ensureUserDocument(member.uid);
        }

        // Create user groups for all users
        await updateDoc(doc(db, "userGroups", currentUser.uid), {
          [groupId + ".groupInfo"]: {
            id: groupId,
            groupName: groupName,
          },
          [groupId + ".date"]: serverTimestamp(),
        });

        for (const member of groupMembers) {
          await updateDoc(doc(db, "userGroups", member.uid), {
            [groupId + ".groupInfo"]: {
              id: groupId,
              groupName: groupName,
            },
            [groupId + ".date"]: serverTimestamp(),
          });
        }
      }
      toast.success("Group Created");
    } catch (err) {
      setError(true);
      console.error("Error creating group: ", err);
    }

    // Reset states
    setGroupMembers([]);
    setGroupName("");
    setSearchQuery("");
    close();
  };
  return (
    <>
      <Dialog open={open} onClose={close} sx={{ background: "transparent" }}>
        <Box
          sx={{
            height: "50vh",
            width: "500px",
            padding: "1rem",
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography
            sx={{
              width: "100%",
              textAlign: "center",
              fontSize: "30px",
              fontWeight: 600,
              fontFamily: "Poppins",
            }}
          >
            Create Group
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginY: "20px",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <TextField
              sx={{ width: "100%" }}
              placeholder="Search User"
              value={searchQuery}
              onChange={handleSearch}
            />

            {groupMembers.length > 0 && (
              <Box
                sx={{
                  width: "100%",

                  my: -2,
                }}
              >
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {groupMembers.map((member) => (
                    <Chip
                      key={member.uid}
                      label={member.displayName}
                      onDelete={() => handleUserDeselect(member.uid)}
                      sx={{ margin: "4px" }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            {filteredUsers.length > 0 && (
              <List
                sx={{
                  width: "100%",
                }}
              >
                {filteredUsers.map((user, index) => (
                  <ListItem
                    button
                    key={index}
                    onClick={() => handleUserSelect(user)}
                    sx={{ borderBottom: "1px solid grey" }}
                  >
                    <ListItemText primary={user.displayName} />
                  </ListItem>
                ))}
              </List>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateGroup}
              disabled={groupMembers.length === 0 || !groupName}
            >
              Create Group
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateGroupModal;
