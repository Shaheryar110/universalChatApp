import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export const checkDisplayNameExist = async (name) => {
  const usersRef = collection(db, "users");

  const q = query(usersRef, where("displayName", "==", name));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If there are documents matching the query
      querySnapshot.forEach((doc) => {
        // Log the document ID and data (for debugging)
        console.log(doc.id, " => ", doc.data());
      });
      return true; // Display name exists
    } else {
      return false; // Display name does not exist
    }
  } catch (error) {
    console.error("Error checking display name:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
export const checkDisplayEmailExist = async (email) => {
  const usersRef = collection(db, "users");

  const q = query(usersRef, where("email", "==", email));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If there are documents matching the query
      querySnapshot.forEach((doc) => {
        // Log the document ID and data (for debugging)
        console.log(doc.id, " => ", doc.data());
      });
      return true; // Display name exists
    } else {
      return false; // Display name does not exist
    }
  } catch (error) {
    console.error("Error checking display name:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
