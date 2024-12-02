import { Router } from "express";
import { validarUsuario } from "../controllers/autenticacionUsuario.js";

const ruta = Router();

ruta.post("/login",validarUsuario);

export default ruta;