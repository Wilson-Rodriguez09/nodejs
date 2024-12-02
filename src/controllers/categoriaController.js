import { mysql } from "../databases/conexion.js";

export const ListarCategoria = async(req,resp)=>{
try{
    const sql="select * from categorias";
    const [result]= await mysql.query(sql);
    if(result.length==0){
        return resp.status(404).json({"message":"No se registraron categorias en la base de datos"})
    }
    else{
        return resp.status(200).json(result)
    }

}catch(error){
    resp.status(500).json({"message":"error al listar categorias"})
}

}

export const registrarCategoria = async(req, resp)=>{
    try{
        const {nombre} = req.body;
        const sql= `insert into categorias(nombre) values(?)`;
        const [result] = await mysql.query(sql,[nombre]);
        resp.status(201).json({msg:"Creación exitosa",result});
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al crear"})
    }
}

export const actualiazarCategoria = async(req, resp)=>{
    try{
        const {nombre} = req.body;
        const id = req.params.id_categoria;
        const sql= `update categorias set nombre=? where id_categoria=${id}`;
        const [result] = await mysql.query(sql,[nombre]);
        resp.status(201).json({msg:"actualizacio exitosa",result});
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al actualizar"})
    }
}

export const eliminarCategoria = async(req, resp)=>{
    try{
        const id = req.params.id_categoria;
        const sql= `delete from categorias where id_categoria=?`;
        const [result] = await mysql.query(sql,[id]);
        if(result.affectedRows>0)return resp.status(200).json({msg:"categoria eliminado con exito",result});
        else{
            return resp.status(404).json({"message":"categoria no eliminado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al eliminar"})
    }
}

export const buscarCategoria = async(req, resp)=>{
    try{
        const id = req.params.id_categoria;
        const sql= `select * from categorias where id_categoria=?`;
        const [result] = await mysql.query(sql,[id]);
        if(result.length>0)return resp.status(200).json({msg:"categoria encontrado con exito",result});
        else{
            return resp.status(404).json({"message":"categoria no encontrado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al buscar"})
    }
}

