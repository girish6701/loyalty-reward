import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "./styles/loyaltyTimeline.css";

function LoyaltyTimeline({ visits }) {
  const [length, setLength] = useState(0);
  const [allPrograms, setAllPrograms] = useState(null);
  const [loader, setLoader] = useState(false);
  const arr = [];

  useEffect(() => {
    if (visits) setLength(visits.length);
  }, [visits]);

  useEffect(() => {
    (async function () {
      setLoader(true);
      const docRef = doc(db, "all-programs", "programs");
      const docSnap = await getDoc(docRef);
      setLoader(false);
      setAllPrograms(docSnap.data().programsArray);
    })();
  }, []);

  if (allPrograms) {
    allPrograms.forEach((program, index) => {
      if (index < length) {
        arr.push(
          <div className="visit-loyalty-cont">
            <p>
              You made your visit {index + 1} on {visits[index].date}
            </p>
          </div>
        );
      }
      if (index == length - 1) {
        arr.push(
          <div className="visit-loyalty-cont">
            <p>
              This is your visit number {length + 1}. You can redeem one dish
              among the following dishes:{" "}
              {program.selectedDishes.map((dish, index, arr) => {
                if (index == arr.length - 1) {
                  return <span>{dish}</span>;
                } else {
                  return <span>{dish}, </span>;
                }
              })}
            </p>
          </div>
        );
      }
      if (index == length) {
        arr.push(
          <div className="next-loyalty">
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              {visits && "🎉 Thank You for being such a LOYAL Customer 🎁"}
            </p>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              For your next visit, you will get a free dish from the following list:
              {program.selectedDishes.map((dish, index, arr) => {
                if (arr.length - 1 == index) {
                  return <span className="next-dish">{dish}</span>;
                } else {
                  return <span className="next-dish">{dish}, </span>;
                }
              })}
            </p>
          </div>
        );
        return;
      }
    });
  }

  return (
    <div>
      {loader ? (
        <h1>LOADING.....</h1>
      ) : (
        <div className="loyalty-main-cont">{allPrograms && arr}</div>
      )}
    </div>
  );
}

export default LoyaltyTimeline;
