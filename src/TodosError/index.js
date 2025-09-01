import React from "react";
import './TodoError.css';

function TodosError() {
    return (
        <li className="TodoError">
          <p className="TodoError-p">Error no se pudieron cargar los datos</p>
        </li>
    )
}

export { TodosError };