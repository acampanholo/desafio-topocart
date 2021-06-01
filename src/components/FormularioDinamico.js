import React from "react";
import formData from "./data";
import "./FormularioDinamico.css";

let sortedData = formData.campos.sort(function (a, b) {
  let keyA = a.ordem,
    keyB = b.ordem;

  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
});

let temp = [];

class FormularioDinamico extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: [
        {
          type: "",
          value: "",
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, name) {
    this.setState({
      value: [...this.state.input, { type: name, value: e.target.value }],
    });
  }

  handleSubmit(e) {
    console.log(JSON.stringify(this.state));
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{formData.titulo}</h1>
        {sortedData.map((campo) => {
          if (campo.type !== "select") {
            return (
              <div key={campo.id}>
                <label for={campo.id}>{campo.label}: </label>
                <input
                  onChange={(e) => this.handleChange(e, campo.name)}
                  type={campo.type}
                  placeholder={campo.label}
                  id={campo.id}
                  name={campo.name}
                />
              </div>
            );
          } else {
            return (
              <div key={campo.id}>
                <label for={campo.id}>{campo.label}: </label>
                <select
                  name={campo.name}
                  id={campo.id}
                  onChange={(e) => this.handleChange(e, campo.name)}>
                  {campo.options.map((option, key) => {
                    return (
                      <option key={key} value={option.value}>
                        {option.text}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          }
        })}
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default FormularioDinamico;
