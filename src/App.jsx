import React, { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:5000";

function App() {
  const fields = [
    "Id",
    "Nombre",
    "Genero",
    "Fec. Nac.",
    "Peso",
    "Altura",
    "Operación",
  ];

  const genders = [
    { value: "M", text: "Masculino" },
    { value: "F", text: "Femenino" },
  ];

  const [person, setPerson] = useState({
    id: null,
    name: "",
    gender: "M",
    birthDate: "",
    weight: 0,
    height: 0,
  });

  const [people, setPeople] = useState([]);

  useEffect(() => {
    findAll();
  }, []);

  function clearForm(evt) {
    evt.preventDefault();
    setPerson({
      id: null,
      name: "",
      gender: "M",
      birthDate: "",
      weight: 0,
      height: 0,
    });
  }

  async function findAll() {
    try {
      const res = await axios.get(`${url}/api/people/`);
      setPeople(res.data);
    } catch (error) {
      alert(error);
    }
  }

  async function finOne(id) {
    try {
      const res = await axios.get(`${url}/api/people/${id}`);
      setPerson(res.data);
    } catch (error) {
      alert(error);
    }
  }

  async function createPerson(evt) {
    evt.preventDefault();
    try {
      const res = await axios.post(`${url}/api/people/`, person);
      setPerson(res.data);
      findAll();
    } catch (error) {
      alert(error);
    }
  }

  async function updatePerson(id, evt) {
    evt.preventDefault();
    try {
      const res = await axios.put(`${url}/api/people/${id}`, person);
      setPerson(res.data);
      findAll();
    } catch (error) {
      alert(error);
    }
  }

  async function deletePerson(id) {
    try {
      const res = await axios.delete(`${url}/api/people/${id}`);
      if (res.status === 200) findAll();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col col-md-4">
          <form>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label>Nombre</label>
                <input
                  className="form-control"
                  type="text"
                  value={person.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPerson((prevDatos) => ({
                      ...prevDatos,
                      name: value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Genero</label>
                <select
                  className="form-control"
                  value={person.gender}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPerson((prevDatos) => ({
                      ...prevDatos,
                      gender: value,
                    }));
                  }}
                >
                  {genders.map((gender) => (
                    <option key={gender.value} value={gender.value}>
                      {gender.text}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <label>Fec. Nac.</label>
                <input
                  className="form-control"
                  type="date"
                  value={person.birthDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPerson((prevDatos) => ({
                      ...prevDatos,
                      birthDate: value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Peso</label>
                <input
                  className="form-control"
                  type="text"
                  value={person.weight}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPerson((prevDatos) => ({
                      ...prevDatos,
                      weight: value,
                    }));
                  }}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label>Altura</label>
                <input
                  className="form-control"
                  type="text"
                  value={person.height}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPerson((prevDatos) => ({
                      ...prevDatos,
                      height: value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                {person.id == null && (
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={createPerson}
                  >
                    Guardar
                  </button>
                )}
                {person.id != null && (
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={(evt) => updatePerson(person.id, evt)}
                  >
                    Actualizar
                  </button>
                )}
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={clearForm}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  {fields.map((field, index) => (
                    <th key={index}>{field}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr key={person.id}>
                    <th scope="row">{person.id}</th>
                    <td>{person.name}</td>
                    <td>{person.gender}</td>
                    <td>{person.birthDate}</td>
                    <td>{person.weight}</td>
                    <td>{person.height}</td>
                    <td>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => finOne(person.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deletePerson(person.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
