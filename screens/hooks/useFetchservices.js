import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetchServices = (location) => {
  const [posts, setPosts] = useState([]);
  const [isErrorP, setError] = useState(null);
  const [isPendingP, setPendingP] = useState(true);

  useEffect(() => {
    const Posts = [];

    const userRef = collection(db, "services");

    let q = query(userRef);
    if (location != "") {
      q = query(userRef, where("location", "==", location));
    }
    getDocs(q)
      .then((users) => {
        users.forEach((user) => {
          Posts.push({ ...user.data(), pid: user.id });
        });
        setPosts(Posts);
        setPendingP(false);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  }, [location]);
  return { posts, isErrorP, isPendingP };
};
export default useFetchServices;
