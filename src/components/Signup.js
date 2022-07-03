import React, { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import "./styles/signup.css";

function Signup() {
  const [newUserDetails, setNewUserDetails] = useState({
    email: "",
    password: "",
    name: "",
    isAdmin: false,
  });
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setNewUserDetails({
      ...newUserDetails,
      [e.target.dataset.type]: e.target.value,
    });
  }

  async function handleSignUp() {
    setLoader(true);
    await createUserWithEmailAndPassword(
      auth,
      newUserDetails.email,
      newUserDetails.password
    )
      .then(async (userCredential) => {
        let user = userCredential.user;
        console.log(user);
        const docRef = await setDoc(doc(db, "users", user.uid), {
          Name: newUserDetails.name,
          Email: newUserDetails.email,
          isAdmin: newUserDetails.isAdmin,
          UserID: user.uid,
        });
        setLoader(false);
        navigate("/userPage");
      })
      .catch((error) => {
        setError(error);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }

  return (
    <div>
      {loader ? (
        <i class="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
      ) : (
        <div className="signup-cont">
          <div className="signup-main-cont">
            {error && <p className="error-text">{error.message}</p>}
            <input
              type="email"
              value={newUserDetails.email}
              placeholder="Email"
              data-type="email"
              onChange={handleChange}
            />
            <input
              type="password"
              value={newUserDetails.password}
              placeholder="Password"
              data-type="password"
              onChange={handleChange}
            />
            <input
              type="text"
              value={newUserDetails.name}
              placeholder="Full Name"
              data-type="name"
              onChange={handleChange}
            />
            <div className="upload-image-div">
              <input
                type="checkbox"
                onChange={(e) => {
                  setNewUserDetails({
                    ...newUserDetails,
                    isAdmin: e.target.checked,
                  });
                }}
              />
              <p>Are you an admin?</p>
            </div>
            <button onClick={handleSignUp} className="signup-btn">
              SIGN UP
            </button>
          </div>
          <div className="signup-main-cont-second">
            <p className="signup-text">Have an account?</p>
            <Link
              to="/login"
              style={{ textDecoration: "none", fontWeight: "bold" }}
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
