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

  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: false,
      confirmed: true,
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false,
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: "",
    });
  }

  React.useEffect(() => {
    console.log("empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("comenzando la validacion");
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
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
            onWrite(event.target.value);
          }}/>
        <button
          onClick={() => {
            onCheck();
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
            onDelete();
          }}
        >Sí, eliminar</button>
        <button
          onClick={() => {
            onReset();
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
            onReset();
          }}
        >Resetear</button>
      </React.Fragment>
    );
  }
}

export { UseState };
