import React from "react";
import './EmptyTodoItem.css';

function EmptyTodoItem () {
  return (
    <li className="EmptyTodoItem">
      <p className={`EmptyTodoItem-p`}>
        &nbsp;
      </p>
    </li>
  )
}

export { EmptyTodoItem };