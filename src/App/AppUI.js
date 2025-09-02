import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoContext } from '../TodoContext';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';
import { TodoHeader } from '../TodoHeader';
import { ChangeAlert } from '../ChangeAlert';

function AppUI() {
  const {
    openModal,
    setOpenModal,
    sincronizeTodos
  } = React.useContext(TodoContext);
  return (
    <>
      <TodoHeader />
      <TodoCounter />

      <div className="centerContainer">
        <TodoSearch />
        <TodoList />
      </div>

      <CreateTodoButton setOpenModal={setOpenModal}/>
      
      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}

      <ChangeAlert sincronize={sincronizeTodos}/>
    </>
  );
}

export { AppUI };