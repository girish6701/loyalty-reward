import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import "./styles/showUsers.css";

function ShowUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState();
  useEffect(() => {
    setLoading(true);
    let pArr = [];
    (async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (!doc.data().isAdmin) pArr = [...pArr, doc.data()];
      });
      setUsers(pArr);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>LOAD</h1>
      ) : (
        <div className="admin-user-div">
          <h1 className="program-heading">USERS</h1>
          <div className="users-cont">
            {users &&
              users.map((user, index) => {
                return (
                  <div key={index} className="user-cont">
                    <p>
                      Name: <span className="user-text">{user.Name}</span>
                    </p>
                    <p>
                      Email: <span className="user-text">{user.Email}</span>
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowUsers;
