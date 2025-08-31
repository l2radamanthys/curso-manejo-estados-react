import React from "react";

const SECURITY_CODE = "paradigma";

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
  });
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("empezando el efecto");

    if (!!loading) {
      // setError(false);

      setTimeout(() => {
        console.log("comenzando la validacion");
        if (state.value === SECURITY_CODE) {
          setState({
            ...state,
            loading: false,
            error: false,
          });
        } else {
          setState({
            ...state,
            loading: false,
            error: true
          });
        }

        console.log("terminando la validacion");
      }, 3000);
    }

    console.log("terminando.");
  }, [loading, state.loading]);

  return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {(state.error && !state.loading) && (
          <p>Error: el código es incorrecto</p>
        )}

        {loading && (
          <p>Cargando...</p>
        )}

        <input
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(event) => {
            setState({...state, value: event.target.value})
          }}/>
        <button
          onClick={() => setState({...state, loading: true})}
        >Comprobar</button>
      </div>
  )
}

export { UseState };
