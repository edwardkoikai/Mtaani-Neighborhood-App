import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const useFetchAdminBusiness = (location) => {
  const [posts, setPosts] = useState([]);
  const [isErrorP, setError] = useState(null);
  const [isPendingP, setPendingP] = useState(true);

  useEffect(() => {
    const Posts = [];

    const userRef = collection(db, "businesses");
    let q = query(userRef, where("status", "==", "pending"));

    if (location != "") {
      q = query(
        userRef,
        where("status", "==", "pending"),
        where("location", "==", location)
      );
    }
    getDocs(q)
      .then((users) => {
        users.forEach((user) => {
          Posts.push({ ...user.data(), id: user.id });
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
export default useFetchAdminBusiness;
