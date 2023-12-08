import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
const ItemsTable = () => {
  const [proyectos, setProyectos] = useState([]);

  const proyectosCollection = collection(db, "proyectos");

  const getProyectos = async () => {
    const data = await getDocs(proyectosCollection);
    setProyectos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const deleteProyecto = async (id) => {
    const proyectoDoc = doc(db, "proyectos", id);
    await deleteDoc(proyectoDoc);
    getProyectos();
  };

  useEffect(() => {
    getProyectos();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre </TableCell>
              <TableCell align="right">Cliente</TableCell>
              <TableCell align="right">Estatus</TableCell>
              <TableCell align="right">Ubicacion</TableCell>
              <TableCell align="right">Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proyectos.map((proyecto) => (
              <TableRow
                key={proyecto.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {proyecto.nombre}
                </TableCell>
                <TableCell align="right">{proyecto.cliente}</TableCell>
                <TableCell align="right">{proyecto.estatus}</TableCell>
                <TableCell align="right">{proyecto.ubicacion}</TableCell>
                <TableCell align="right">
                  <DeleteIcon
                    onClick={() => {
                      deleteProyecto(proyecto.id);
                    }}
                  />

                  <Link to={`/edit/${proyecto.id}`} style={{ color: "black" }}>
                    <EditIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemsTable;
