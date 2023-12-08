import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import TextField from "@mui/material/TextField";
import { Mapa } from "./Map";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Create = () => {
  const [nombre, setNombre] = useState("");
  const [cliente, setCliente] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estatus, setEstatus] = useState("");
  const [mapadesplegado, setMapadesplegado] = useState(false);
  const navigate = useNavigate();

  const proyectoCollection = collection(db, "proyectos");
  const handleMapNameChange = (name) => {
    setUbicacion(name);
  };

  const proyectos = async (e) => {
    e.preventDefault();
    await addDoc(proyectoCollection, {
      nombre: nombre,
      cliente: cliente,
      ubicacion: ubicacion,
      estatus: estatus,
    });
    navigate("/");
  };
  return (
    <div>
      <h1>Crear proyecto</h1>

      <form onSubmit={proyectos}>
        {" "}
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <TextField
            style={{ margin: "20px" }}
            id="outlined-basic"
            label="Nombre"
            variant="outlined"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            style={{ margin: "20px" }}
            id="outlined-basic"
            label="Cliente"
            variant="outlined"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
          />
          <TextField
            style={{ margin: "20px" }}
            id="outlined-basic"
            label="Ubicacion"
            variant="outlined"
            value={ubicacion}
            onClick={() => setMapadesplegado(true)}
            onChange={(e) => setUbicacion(e.target.value)}
          />
          <Select
            style={{ margin: "20px" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Estatus actual"
            value={estatus}
            onChange={(e) => setEstatus(e.target.value)}
          >
            <MenuItem value={"En curso"}>En curso</MenuItem>
            <MenuItem value={"Stand by"}>Stand by</MenuItem>
            <MenuItem value={"Terminado"}>Terminado</MenuItem>
          </Select>
        </FormControl>
        <br></br>
        <Button variant="contained" type="submit">
          Guardar
        </Button>
      </form>
      {mapadesplegado && (
        <Mapa
          style={{ display: "flex", height: "300px", width: "200px" }}
          onMapNameChange={handleMapNameChange}
        />
      )}
    </div>
  );
};

export default Create;
