import React, { act } from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    console.log("empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("comenzando la validacion");
        if (state.value === SECURITY_CODE) {
          dispatch({
            type: actionTypes.confirm
          });
        } else {
          dispatch({
            type: actionTypes.error
          });
        }

        console.log("terminando la validacion");
      }, 3000);
    }

    console.log("terminando.");
  }, [state.loading]);

  console.log(":::", state)

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {(state.error && !state.loading) && (
          <p>Error: el código es incorrecto</p>
        )}

        {state.loading && (
          <p>Cargando...</p>
        )}

        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(event) => {
            dispatch({ type: actionTypes.write, payload: event.target.value });
          }}/>
        <button
          onClick={() => {
            dispatch({ type: actionTypes.check });
          }}
        >Comprobar</button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Pedimos confirmación</p>
        <button
          onClick={() => {
            dispatch({type: actionTypes.delete});
          }}
        >Sí, eliminar</button>
        <button
          onClick={() => {
            dispatch({type: actionTypes.reset});
          }}
        >No</button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h2>Eliminar {name}</h2>
        <p>Eliminado con exíto.</p>
        <button
          onClick={() => {
            dispatch({type: actionTypes.reset});
          }}
        >Resetear</button>
      </React.Fragment>
    );
  }
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
};

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  check: 'CHECK',
  write: 'WRITE',
  delete: 'DELETE',
  reset: 'RESET',
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    loading: false,
    error: false,
    confirmed: true,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false
  },
  [actionTypes.check]: {
    ...state,
    loading: true
  },
  [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    ...initialState
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };
