import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const AuthContext = React.createContext();

export function AuthContextProvider({ children }) {
  const [initialLoader, setInitialLoader] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setInitialLoader(false);
    });
    return unsubscribe;
  }, []);
  let value = currentUser;
  return (
    <AuthContext.Provider value={value}>
      <div>
        {initialLoader ? (
          <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
        ) : (
          children
        )}
        {/* {!initialLoader && children} */}
      </div>
    </AuthContext.Provider>
  );
}
