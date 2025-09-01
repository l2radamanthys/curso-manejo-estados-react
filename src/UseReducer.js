import React from "react";

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
            type: 'CONFIRM'
          });
        } else {
          dispatch({
            type: 'ERROR'
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
            dispatch({ type: 'WRITE', payload: event.target.value });
          }}/>
        <button
          onClick={() => {
            dispatch({ type: 'CHECK' });
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
            dispatch({type: 'DELETE'});
          }}
        >Sí, eliminar</button>
        <button
          onClick={() => {
            dispatch({type: 'RESET'});
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
            dispatch({type: 'RESET'});
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
}

const reducerObject = (state, payload) => ({
  'ERROR': {
    ...state,
    error: true,
    loading: false
  },
  'CHECK': {
    ...state,
    loading: true
  },
  'CONFIRM': {
    ...state,
    loading: false,
    error: false,
    confirmed: true,
  },
  'WRITE': {
    ...state,
    value: payload
  },
  'DELETE': {
    ...state,
    deleted: true,
  },
  'RESET': {
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
