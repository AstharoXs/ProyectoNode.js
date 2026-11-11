import './App.css';
import { useState, useEffect } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function App() {

  const [id, setId] = useState();
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState();

  const [editar, setEditar] = useState(false)

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios
    })
      .then(() => {

        setNombre("");
        setEdad("");
        setPais("");
        setCargo("");
        setAnios("");

        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "¡Registro Éxitoso!",
          html: "El empleado <strong>"+nombre+"</strong> fue registrado con éxito!",
          icon: 'success',
          timer: 1000,
        })
      })
      .catch((error) => {
        console.error("Error al registrar:", error);
        alert("No se pudo registrar el empleado");
      });
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        Swal.fire({
          title: "¡Actualización Éxitosa!",
          html: "El empleado <strong>"+nombre+"</strong> fue actualizado con éxito!",
          icon: 'success',
          timer: 1000,
        })
      })
      .catch((error) => {
        console.error("Error al registrar:", error);
        alert("No se pudo registrar el empleado.");
      });
  };

  const deleteEmpleado = (val) => {
    Swal.fire({
          title: "¿Desea elimiar?",
          html: "¿Desea eliminar al empleado <strong>"+val.nombre+"</strong>?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#bb92dd",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminarlo!"
        }).then((result) => {
            if (result.isConfirmed) {
              Axios.delete(`http://localhost:3001/delete/${val.id}`)
              .then(() => {
                getEmpleados();
                limpiarCampos();
                Swal.fire({
                  title: "¡Eliminación Éxitosa!",
                  html: "Registro de <strong>"+val.nombre+"</strong> eliminado correctamente.",
                  icon: "success",
                  timer: 1000,
                });
              })
              .catch((error) => {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar el empleado.");
              });
            }
        });
  };

  const limpiarCampos = () => {
    setId("");
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setEditar(false);
  }

  const editarEmpleado = (val)=>{
    setEditar(true);

    setId(val.id);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
  }

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error("Error al consultar empleados:", error);
      });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>

        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre:</span>
            <input type="text" value={nombre}
              onChange={(event) => setNombre(event.target.value)}
              className="form-control"
              placeholder="Ingrese un nombre"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Edad:</span>
            <input type="number" value={edad}
              onChange={(event) => setEdad(event.target.value)}
              className="form-control"
              placeholder="Ingrese edad"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">País:</span>
            <input type="text" value={pais}
              onChange={(event) => setPais(event.target.value)}
              className="form-control"
              placeholder="Ingrese país"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Cargo:</span>
            <input type="text" value={cargo}
              onChange={(event) => setCargo(event.target.value)}
              className="form-control"
              placeholder="Ingrese su cargo"/>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              Años de experiencia:
            </span>
            <input type="number" value={anios}
              onChange={(event) => setAnios(event.target.value)}
              className="form-control"
              placeholder="Ingrese los años"/>
          </div>
        </div>
        <div className="card-footer fg-2">
          {
            editar?
            <div className="">
              <button className="btn-subtle theme-accent m-2" onClick={update}>Actualizar</button>
              |
              <button className="btn-subtle theme-danger m-2" onClick={limpiarCampos}>Cancelar</button>
            </div>
            : <button className="btn-outline theme-success" onClick={add}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nomnre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años de experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key)=>{
              return (
                <tr key={val.id}>
                  <th>{val.id}</th>
                    <td>{val.nombre}</td>
                    <td>{val.edad}</td>
                    <td>{val.pais}</td>
                    <td>{val.cargo}</td>
                    <td>{val.anios}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button type="button" onClick={()=>{editarEmpleado(val);}} className="btn-outline theme-info">Editar</button>
                        |
                        <button type="button" onClick={()=>{deleteEmpleado(val);}} className="btn-outline theme-danger">Eliminar</button>
                      </div>
                    </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
