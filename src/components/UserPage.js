import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  let user = useContext(AuthContext);
  useEffect(() => {
    (async function () {
      if (user) {
        setLoader(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setLoader(false);
        if (docSnap.data().isAdmin) {
          navigate("/adminPage");
        }
      }
    })();
  }, [user]);
  return (
    <div>
      {loader ? (
        <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
      ) : (
        <div>UserPage</div>
      )}
    </div>
  );
}

export default UserPage;
