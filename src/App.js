import AdminPage from "./components/AdminPage";
import LoginUser from "./components/LoginUser";
import UserPage from "./components/UserPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./components/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useContext, useEffect } from "react";

function App() {
  // let user = useContext(AuthContext);
  // useEffect(() => {
  //   (async function () {
  //     if (user) {
  //       const docRef = doc(db, "users", user.uid);
  //       const docSnap = await getDoc(docRef);
  //       // setUserDetails(docSnap.data());
  //       // setLoading(false);
  //       console.log(docSnap.data());
  //     }
  //   })();
  // }, [user]);
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/adminPage"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/userPage"
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectToFeed>
                <LoginUser />
              </RedirectToFeed>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

function PrivateRoute({ children }) {
  const user = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
}

function RedirectToFeed({ children }) {
  let user = useContext(AuthContext);
  return user ? <Navigate to="/userPage" replace /> : children;
}

export default App;
