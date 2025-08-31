import React from "react";
import { Loading } from "./Loading.js";

const SECURITY_CODE = "paradigma";

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      error: false,
      loading: false,
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");

    if (!!this.state.loading) {
      setTimeout(() => {
        console.log("comenzando la validacion");

        if (this.state.value === SECURITY_CODE) {
          this.setState({
            loading: false,
            error: false
          });
        } else {
          this.setState({
            loading: false,
            error: true,
          });
        }

        console.log("terminando la validacion");
      }, 3000);
    }
  }

  render() {
    // const {error, loading, value} = this.state;

    return(
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {(this.state.error && !this.state.loading) && (
          <p>Error: el código es incorrecto</p>
        )}

        {this.state.loading && (
          <Loading />
        )}

        <input
          placeholder="Código de seguridad"
          value={this.state.value}
          onChange={(event) => {
            this.setState({
              value: event.target.value,
            })
          }}
          />
        <button
          onClick={() => this.setState({ loading: true })}
        >Comprobar</button>
      </div>
    );
  }
}

export { ClassState };
