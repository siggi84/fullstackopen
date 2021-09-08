import React from "react";

const Number = ({ person, onDelete }) => {
  return (
    <li>
      <button onClick={onDelete}>delete</button>
      {person.name} {person.number}
    </li>
  );
};
const PhoneBook = ({ persons, onDelete }) => {
  return (
    <ul>
      {persons.map((p) => (
        <Number key={p.name} person={p} onDelete={() => onDelete(p.id)} />
      ))}
    </ul>
  );
};

export default PhoneBook;
