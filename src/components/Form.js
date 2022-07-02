import React, { useState } from "react";
import restaurantDishes from "../data";
import "./styles/form.css";

function Form({ setShowForm, setAllPrograms, allPrograms }) {
  const [selectedDishes, setSlectedDishes] = useState(null);
  const [numberOfVisits, setNumberOfVisits] = useState();
  // const [allProgram, setAllPrograms] = useState(null);

  function addDishes(e) {
    if (selectedDishes) {
      setSlectedDishes([...selectedDishes, e.target.innerText]);
    } else {
      setSlectedDishes([e.target.innerText]);
    }
  }

  function handleChange(e) {
    setNumberOfVisits(e.target.value);
  }

  function handleProgram() {
    if (allPrograms) {
      setAllPrograms([...allPrograms, { selectedDishes, numberOfVisits }]);
    } else {
      setAllPrograms([{ selectedDishes, numberOfVisits }]);
    }
    setShowForm(false);
  }

  return (
    <div className="dish-form">
      <h4>Select Dishes</h4>
      <div className="dishes-cont">
        {restaurantDishes[0].dishes.map((dish) => {
          return (
            <p onClick={addDishes} className="dish-name">
              {dish.name}
            </p>
          );
        })}
      </div>
      {selectedDishes && <h4 className="data-heading">Dishes for Program</h4>}
      {selectedDishes && selectedDishes.map((d) => <p>{d}</p>)}
      <h4 className="data-heading">No. of Visits</h4>
      <input
      className="visits-input"
        onChange={handleChange}
        type="number"
        placeholder="Number of visits"
      />
      <br></br>
      <button
      className="program-btn"
        onClick={() => {
          handleProgram();
        }}
      >
        Create Program
      </button>
    </div>
  );
}

export default Form;
