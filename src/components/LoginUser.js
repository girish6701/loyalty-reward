import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
// import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./styles/loginUser.css";

function LoginUser() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  // const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setUserDetails({ ...userDetails, [e.target.type]: e.target.value });
  }

  async function handleClick() {
    setLoader(true);
    await signInWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        // setUser(user);
      })
      .catch((error) => {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });

    setUserDetails({
      email: "",
      password: "",
    });
    setLoader(false);
  }

  // async function handleSignOut() {
  //   // await signOut(auth);
  //   setUser(null);
  // }

  return (
    <div>
      {loader ? (
        <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
      ) : (
        <div className="login-cont">
          <div className="main-div">
            <div className="main-login-cont">
              {error && <p className="error-text">{error.message}</p>}
              <input
                type="email"
                value={userDetails.email}
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="password"
                value={userDetails.password}
                placeholder="Password"
                onChange={handleChange}
              />
              <button onClick={handleClick} className="login-btn">
                Log In
              </button>
            </div>
            {/* <div className="main-login-cont second"> */}
            {/* <p className="signup-text">Don't have an account?</p> */}
            {/* <Link
                to="/signup"
                style={{ textDecoration: "none", fontWeight: "bold" }}
              >
                Sign Up
              </Link> */}
            {/* </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginUser;
