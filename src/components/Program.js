import React, { useEffect, useState } from "react";
import Form from "./Form";
import "./styles/program.css";

function Program() {
  const [showForm, setShowForm] = useState(false);
  const [allPrograms, setAllPrograms] = useState(null);

  function createProgram() {
    setShowForm(!showForm);
  }

  useEffect(() => {
    if (allPrograms)
      localStorage.setItem("programs", JSON.stringify(allPrograms));
  }, [allPrograms]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("programs"));
    setAllPrograms(data);
  }, []);

  return (
    <div>
      <h1 className="program-heading">ALL LOYALTY PROGRAMS</h1>
      {showForm && (
        <Form
          setShowForm={setShowForm}
          setAllPrograms={setAllPrograms}
          allPrograms={allPrograms}
        />
      )}

      <div className="main-programs-cont">
        {allPrograms &&
          allPrograms.map((program) => {
            return (
              <div className="program-cont">
                <p>
                  No. of Visits:{" "}
                  <span className="visit-text">{program.numberOfVisits}</span>
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
  );
}

export default Program;
