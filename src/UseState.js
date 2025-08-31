import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  });

  console.log(":::", state)

  React.useEffect(() => {
    console.log("empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("comenzando la validacion");
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            loading: false,
            error: false,
            confirmed: true,
          });
        } else {
          setState({
            ...state,
            loading: false,
            error: true,
          });
        }

        console.log("terminando la validacion");
      }, 3000);
    }

    console.log("terminando.");
  }, [state.loading]);

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
            setState({
              ...state,
              value: event.target.value
            });
          }}/>
        <button
          onClick={() => {
            setState({
              ...state,
              loading: true
            });
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
            setState({
              ...state,
              value: "",
              deleted: true,
            });
          }}
        >Sí, eliminar</button>
        <button
          onClick={() => {
            setState({
              ...state,
              confirmed: false,
              value: "",
            });
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
            setState({
              ...state,
              confirmed: false,
              deleted: false,
            });
          }}
        >Resetear</button>
      </React.Fragment>
    );
  }
}

export { UseState };
