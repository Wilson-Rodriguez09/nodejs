import { Router } from "express";
import { actualiazarCategoria, buscarCategoria, eliminarCategoria, ListarCategoria, registrarCategoria } from "../controllers/categoriaController.js";

const ruta = Router();

ruta.get("/categorias",ListarCategoria);
ruta.get("/categorias/:id_categoria",buscarCategoria)
ruta.post("/categorias",registrarCategoria);
ruta.put("/categorias/:id_categoria",actualiazarCategoria);
ruta.delete("/categorias/:id_categoria", eliminarCategoria);

export default ruta;