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

const useFetchNews = (location) => {
  const [posts, setPosts] = useState([]);
  const [isErrorP, setError] = useState(null);
  const [isPendingP, setPendingP] = useState(true);

  useEffect(
    (tbl) => {
      const Posts = [];

      const userRef = collection(db, "posts");
      let q = query(userRef, orderBy("createdAt", "desc"));

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
    },
    [location]
  );
  return { posts, isErrorP, isPendingP };
};
export default useFetchNews;
