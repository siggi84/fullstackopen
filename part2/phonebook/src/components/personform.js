import React, { useState } from "react";
import phonebookService from "../services/phonebook.js";

const PersonForm = ({ persons, setPersons }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const already_exists = persons.map((x) => x.name).includes(name);
    if (name === "") {
      alert(`The name field is missing`);
      return;
    }

    if (number === "") {
      alert(`The number field is missing`);
      return;
    }

    if (already_exists) {
      window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      );
      const before = persons.filter((p) => p.name === name)[0];
      const after = { ...before, number: number };
      phonebookService
        .update(before.id, after)
        .then((p) => setPersons(persons.map((k) => (k.id === p.id ? p : k))));

      return;
    } else {
      const name_object = { name: name, number: number };
      phonebookService.create(name_object).then((response) => {
        setPersons(persons.concat(response));
        setName("");
        setNumber("");
        return response;
      });
    }
  };

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
