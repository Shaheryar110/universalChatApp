import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
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

export const getUserById = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.log(err);
  }
};
export const updateUser = async (obj, id) => {
  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, obj);
    return true;
  } catch (er) {
    console.log(er);
    return false;
  }
};
export const updatelanguage = async (obj, id) => {
  try {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, { baseLanguage: obj });
    return true;
  } catch (er) {
    console.log(er);
    return false;
  }
};

export const sendFeedback = async (data) => {
  try {
    const newCityRef = doc(collection(db, "feedback"));

    await setDoc(newCityRef, data);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
export const allFeedBacks = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "feedback"));
  querySnapshot.forEach((doc) => {
    temp.push({ ...doc.data(), id: doc.id });
  });
  return temp;
};

export const getAllUsers = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    temp.push({ ...doc.data(), id: doc.id });
  });
  return temp;
};
