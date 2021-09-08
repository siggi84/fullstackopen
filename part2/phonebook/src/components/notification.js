import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const className= message.isError ? "error" : "notification"
  return <div className={className}>{message.text}</div>;
};

export default Notification
