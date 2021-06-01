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

class FormularioDinamico extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let output = [];
    let inputs = document.querySelectorAll(".input");

    inputs.forEach((input) => {
      output.push({ [input.name]: input.value });
    });

    this.setState({ json: output });
    console.log(JSON.stringify(output));

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
                  type={campo.type}
                  placeholder={campo.label}
                  id={campo.id}
                  name={campo.name}
                  className="input"
                />
              </div>
            );
          } else {
            return (
              <div key={campo.id}>
                <label for={campo.id}>{campo.label}: </label>
                <select name={campo.name} className="input" id={campo.id}>
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
