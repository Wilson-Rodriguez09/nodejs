import { mysql } from "../databases/conexion.js";

export const ListarUsuario = async(req,resp)=>{
try{
    const sql="select * from usuarios";
    const [result]= await mysql.query(sql);
    if(result.length==0){
        return resp.status(404).json({"message":"No se registraron usuarios en la base de datos"})
    }
    else{
        return resp.status(200).json(result)
    }

}catch(error){
    resp.status(500).json({"message":"error al listar usuarios"})
}

}

export const registrarUsuario = async(req, resp)=>{
    try{
        const {identificacion,nombres,direccion,telefono,correo,rol} = req.body;
        const sql= `insert into usuarios(identificacion,nombres,direccion,telefono,correo,rol) values(?,?,?,?,?,?)`;
        const [result] = await mysql.query(sql,[identificacion,nombres,direccion,telefono,correo,rol]);
        resp.status(201).json({msg:"Creación exitosa",result});
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al crear"})
    }
}

export const actualiazarUsuario = async(req, resp)=>{
    try{
        const {identificacion,nombres,direccion,telefono,correo,rol} = req.body;
        const id = req.params.id_usuario;
        const sql= `update usuarios set identificacion=?,nombres=?,direccion=?,telefono=?,correo=?,rol=? where id_usuario=${id}`;
        const [result] = await mysql.query(sql,[identificacion,nombres,direccion,telefono,correo,rol]);
        resp.status(201).json({msg:"actualizacio exitosa",result});
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al actualizar"})
    }
}

export const eliminarUsuario = async(req, resp)=>{
    try{
        const id = req.params.id_usuario;
        const sql= `delete from usuarios where id_usuario=?`;
        const [result] = await mysql.query(sql,[id]);
        if(result.affectedRows>0)return resp.status(200).json({msg:"usuario eliminado con exito",result});
        else{
            return resp.status(404).json({"message":"usuario no eliminado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al eliminar"})
    }
}

export const buscarUsuario = async(req, resp)=>{
    try{
        const id = req.params.id_usuario;
        const sql= `select * from usuarios where id_usuario=?`;
        const [result] = await mysql.query(sql,[id]);
        if(result.length>0)return resp.status(200).json({msg:"usuario encontrado con exito",result});
        else{
            return resp.status(404).json({"message":"usuario no encontrado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al buscar"})
    }
}


