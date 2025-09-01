import './TodoList.css';
import React from 'react';
import { TodoItem } from '../TodoItem';
import { TodosLoading } from '../TodosLoading';
import { EmptyTodos } from '../EmptyTodos';
import { TodosError } from '../TodosError';
import { TodoContext } from '../TodoContext';


function TodoList() {
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    totalTodos,
    completedTodos,
    deleteTodo,
  } = React.useContext(TodoContext);
  return (
    <ul className="TodoList">
      {loading && <TodosLoading />}
        {error && <TodosError />}
        {(!loading && searchedTodos.length === 0) && <EmptyTodos />}

        {(!loading && completedTodos < totalTodos) && <div className="listSeparator">Pendings</div>}

        {searchedTodos.filter(todo => !todo.completed).map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}

        {(!loading && completedTodos > 0) && <div className="listSeparator">Completed</div>}

        {searchedTodos.filter(todo => todo.completed).map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
    </ul>
  );
}

export { TodoList };

