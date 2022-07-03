import AdminPage from "./components/AdminPage";
import LoginUser from "./components/LoginUser";
import UserPage from "./components/UserPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./components/AuthContext";
import { useContext } from "react";
import Signup from "./components/Signup";

function App() {
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
          <Route
            path="/"
            element={
              <RedirectToFeed>
                <LoginUser />
              </RedirectToFeed>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectToFeed>
                <Signup />
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
