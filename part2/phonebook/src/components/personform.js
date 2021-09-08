import React, { useState } from "react";
import phonebookService from "../services/phonebook.js";

const PersonForm = ({ name, setName, number, setNumber, addPerson}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
