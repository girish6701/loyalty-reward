import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import restaurantDishes from "../data";
import "./styles/userPage.css";
import { setDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import LoyaltyTimeline from "./LoyaltyTimeline";

function UserPage() {
  const [selectedDishes, setSlectedDishes] = useState(null);
  const [date, setDate] = useState("");
  const [allVisits, setAllVisits] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  let user = useContext(AuthContext);

  useEffect(() => {
    (async function () {
      if (user) {
        setLoader(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setLoader(false);
        setCurrentUser(docSnap.data());
        if (docSnap.data().isAdmin) {
          navigate("/adminPage");
        }
      }
    })();
  }, [user]);

  useEffect(() => {
    setLoader(true);
    (async function () {
      if (allVisits) {
        const docRef = await setDoc(doc(db, "user-visits", user.uid), {
          allVisits: [...allVisits],
        });
      }
    })();
    setLoader(false);
  }, [allVisits]);

  useEffect(() => {
    setLoader(true);
    let pArr = [];
    const unsub = onSnapshot(doc(db, "user-visits", user.uid), (doc) => {
      setAllVisits(doc.data().allVisits);
    });
    setLoader(false);
    return () => {
      unsub();
    };
  }, []);

  function addDishes(e) {
    if (selectedDishes) {
      setSlectedDishes([...selectedDishes, e.target.innerText]);
    } else {
      setSlectedDishes([e.target.innerText]);
    }
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  async function handleClick() {
    handleAddMore();
    setShowForm(!showForm);
  }

  function handleAddMore() {
    if (date == "" || selectedDishes == null) {
      return;
    }

    if (allVisits) {
      setAllVisits([...allVisits, { date, selectedDishes }]);
    } else {
      setAllVisits([{ date, selectedDishes }]);
    }

    setDate("");
    setSlectedDishes(null);
  }

  return (
    <div>
      {loader ? (
        <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
      ) : showForm ? (
        <div className="users-cont">
          <div className="visits-cont">
            {allVisits &&
              allVisits.map((visit, index) => {
                return (
                  <div key={index} className="visit-cont">
                    <p>{index + 1}.</p>
                    <p>{visit.date}</p>
                    {visit.selectedDishes.map((dish, index) => (
                      <p key={index}>{dish}</p>
                    ))}
                  </div>
                );
              })}
          </div>
          <input value={date} onChange={handleDateChange} type="date" />
          <div>
            <h4>Menu</h4>
            <div className="dishes-cont">
              {restaurantDishes[0].dishes.map((dish, index) => {
                return (
                  <p key={index} onClick={addDishes} className="dish-name">
                    {dish.name}
                  </p>
                );
              })}
            </div>
            {selectedDishes && (
              <h4 className="data-heading">Dishes for Program</h4>
            )}
            {selectedDishes &&
              selectedDishes.map((dish, index) => <p key={index}>{dish}</p>)}
          </div>
          <div>
            <button onClick={handleAddMore} className="login-btn">
              Add New Visit
            </button>
          </div>
          <button onClick={handleClick} className="login-btn">
            SUBMIT
          </button>
        </div>
      ) : (
        <div style={{ padding: "10px" }}>
          <h1>Username: {currentUser && currentUser.Name}</h1>
          <i
            onClick={() => {
              signOut(auth);
            }}
            class="fa-solid fa-power-off icon"
          ></i>
          <h2 style={{ marginTop: "30px", textAlign: "center" }}>All Visits</h2>
          <div className="display-visits">
            {!allVisits && (
              <p style={{ fontSize: "1.2rem" }}>Today is your first visit</p>
            )}
            {allVisits &&
              allVisits.map((visit, index) => {
                return (
                  <div key={index} className="visit-cont">
                    <p style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                      Visit {index + 1}
                    </p>
                    <p>Date: {visit.date}</p>
                    <p>Order:</p>
                    {visit.selectedDishes.map((dish, index) => (
                      <p key={index}>{dish}</p>
                    ))}
                  </div>
                );
              })}
          </div>
          <div className="loyalty-cont">
            <h2
              style={{
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              LOYALTY TIMELINE
            </h2>
            <LoyaltyTimeline visits={allVisits} />
          </div>
          <div className="btn-div">
            <button
              className="add-visit-btn"
              onClick={() => setShowForm(!showForm)}
            >
              Add Visits
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPage;
