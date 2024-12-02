import { Router } from "express";
import { actualiazarMacotas, buscarMacotas, eliminarMascotas, ListarMacotas, registrarMacotas, CarcagarImagen } from "../controllers/mascotasController.js";

const ruta = Router();

ruta.get("/mascotas",ListarMacotas);
ruta.get("/mascotas/:id_mascotas",buscarMacotas)
ruta.post("/mascotas",CarcagarImagen,registrarMacotas);
ruta.put("/mascotas/:id_mascota",actualiazarMacotas);
ruta.delete("/mascotas/:id_mascota", eliminarMascotas);

export default ruta; 