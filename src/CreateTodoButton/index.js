import './CreateTodoButton.css';

function CreateTodoButton({ setOpenModal }) {
  return (
    <button
      className="CreateTodoButton"
      onClick={
        () => {setOpenModal(state => !state)}
      }
    >Add Task</button>
  );
}

export { CreateTodoButton };
