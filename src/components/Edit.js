import React, { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import TextField from "@mui/material/TextField";
import { useParams, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Mapa } from "./Map";

const Edit = () => {
  const [proyecto, setProyecto] = useState("");
  const [mapadesplegado, setMapadesplegado] = useState(false);
  const [ubicacion, setUbicacion] = useState(proyecto.ubicacion);

  const handleMapNameChange = (name) => {
    setUbicacion(name);
  };
  console.log(ubicacion);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProyectoById = async () => {
    const proyectos = await getDoc(doc(db, "proyectos", id));
    const proyecto = proyectos.data();
    setProyecto(proyecto);
    setUbicacion(proyecto.ubicacion);
  };

  useEffect(() => {
    getProyectoById();
  }, []);

  const actualizar = async (e) => {
    e.preventDefault();
    const proyectoActualizado = proyecto;
    proyectoActualizado.ubicacion = ubicacion;

    const docRef = doc(db, "proyectos", id);
    await updateDoc(docRef, proyectoActualizado);

    navigate("/");
  };

  return (
    <div>
      <h1>Editar proyecto</h1>
      {proyecto && (
        <form onSubmit={actualizar}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              style={{ margin: "20px" }}
              id="outlined-basic"
              variant="outlined"
              label="cliente"
              focused
              value={proyecto.cliente}
              onChange={(e) =>
                setProyecto((prevState) => ({
                  ...prevState,
                  cliente: e.target.value,
                }))
              }
            />

            <TextField
              focused
              style={{ margin: "20px" }}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              value={proyecto.nombre}
              onChange={(e) =>
                setProyecto((prevState) => ({
                  ...prevState,
                  nombre: e.target.value,
                }))
              }
            />
            <TextField
              style={{ margin: "20px" }}
              id="outlined-basic"
              focused
              label="Ubicacion"
              variant="outlined"
              onClick={() => setMapadesplegado(true)}
              value={ubicacion || proyecto.ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />

            <TextField
              select
              label="Estatus"
              focused
              value={proyecto.estatus || ""}
              onChange={(e) =>
                setProyecto((prevState) => ({
                  ...prevState,
                  estatus: e.target.value,
                }))
              }
            >
              <MenuItem value={"En curso"}>En curso</MenuItem>
              <MenuItem value={"Stand by"}>Stand by</MenuItem>
              <MenuItem value={"Terminado"}>Terminado</MenuItem>
            </TextField>
          </FormControl>
          <br></br>
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </form>
      )}{" "}
      {mapadesplegado && (
        <Mapa
          style={{ display: "flex", height: "300px", width: "200px" }}
          onMapNameChange={handleMapNameChange}
        />
      )}
    </div>
  );
};

export default Edit;
