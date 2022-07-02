import React, { useEffect, useState } from "react";
import Form from "./Form";
import "./styles/program.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { setDoc } from "firebase/firestore";
import { collection, onSnapshot } from "firebase/firestore";

function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [allPrograms, setAllPrograms] = useState(null);
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
        // console.log(docSnap.data());
        if (!docSnap.data().isAdmin) {
          navigate("/userPage");
        }
      }
    })();
  }, [user]);

  function createProgram() {
    setShowForm(!showForm);
  }

  useEffect(() => {
    (async () => {
      if (allPrograms) {
        // localStorage.setItem("programs", JSON.stringify(allPrograms));
        const docRef = await setDoc(doc(db, "all-programs", "programs"), {
          programsArray: [...allPrograms],
        });
      }
    })();
  }, [allPrograms]);

  useEffect(() => {
    // const data = JSON.parse(localStorage.getItem("programs"));
    // setAllPrograms(data);
    setLoader(true);
    let pArr = [];
    const unsubscribe = onSnapshot(
      collection(db, "all-programs"),
      (snapshots) => {
        snapshots.forEach((snapshot) => {
          pArr = [...snapshot.data().programsArray];
        });
        setAllPrograms(pArr);
        setLoader(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      {loader ? (
        <i className="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
      ) : showForm ? (
        <Form
          setShowForm={setShowForm}
          setAllPrograms={setAllPrograms}
          allPrograms={allPrograms}
        />
      ) : (
        <div>
          <h1 className="program-heading">ALL LOYALTY PROGRAMS</h1>
          <div className="main-programs-cont">
            {allPrograms &&
              allPrograms.map((program) => {
                return (
                  <div className="program-cont">
                    <p>
                      No. of Visits:{" "}
                      <span className="visit-text">
                        {program.numberOfVisits}
                      </span>
                    </p>
                    <p>
                      Dishes:{" "}
                      {program.selectedDishes.map((dish, index, array) => {
                        if (index == array.length - 1) {
                          return <span className="dish-text">{dish}</span>;
                        }
                        return <span className="dish-text">{dish}, </span>;
                      })}
                    </p>
                  </div>
                );
              })}
          </div>
          <div className="btn-cont">
            <button onClick={createProgram} className="create-btn">
              Create Program
            </button>
          </div>
        </div>
      )}
    </div>

    // </div>
  );
}

export default AdminPage;
