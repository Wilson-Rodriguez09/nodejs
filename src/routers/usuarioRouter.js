import { Router } from "express";
import {actualiazarUsuario, buscarUsuario, eliminarUsuario, ListarUsuario, registrarUsuario} from "../controllers/usuarioController.js";

const ruta = Router();

ruta.get("/usuarios",ListarUsuario);
ruta.get("/usuarios/:id_usuario",buscarUsuario)
ruta.post("/usuarios",registrarUsuario);
ruta.put("/usuarios/:id_usuario",actualiazarUsuario);
ruta.delete("/usuarios/:id_usuario", eliminarUsuario);

export default ruta;