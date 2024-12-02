import { mysql } from "../databases/conexion.js";
import multer from "multer";

 const storage=multer.diskStorage({
    destination:function(req,img,cb){
        cb(null,"public/img")
    },
    filename: function(req,img,cb){
        cb(null,img.originalname);
    }
 });

 const upload=multer({storage:storage});
 export const CarcagarImagen=upload.single('foto');

 /////////////////////////////////////////////////////

export const ListarMacotas = async(req,resp)=>{
try{
    const sql="select * from mascotas";
    const [result]= await mysql.query(sql);
    if(result.length==0){
        return resp.status(404).json({"message":"No se registraron mascotas en la base de datos"})
    }
    else{
        return resp.status(200).json(result)
    }

}catch(error){
    resp.status(500).json({"message":"error al listar mascotas"})
}

}

export const registrarMacotas = async(req, resp)=>{
    try{
        const {nombre,raza,genero, usuario, estado} = req.body;
        const foto = req.file.filename
        const sql= `insert into mascotas(nombre, raza, genero, usuario, estado, foto) values(?,?,?,?,?,?)`;
        const [result] = await mysql.query(sql,[nombre, raza, genero, usuario, estado, foto]);
        resp.status(201).json({msg:"Creación exitosa",result});
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al crear"})
    }
}

export const actualiazarMacotas = async(req, resp)=>{
    try{
        const {nombre,raza,genero,usuario,estado} = req.body;
        const id = req.params.id_mascotas;
        const sql= `update mascotas set nombre=?, raza=?, genero=?, usuario=?, estado=? where id_mascota=${id}`;
        const [result] = await mysql.query(sql,[nombre, raza, genero, usuario, estado, foto]);
        resp.status(201).json({msg:"actualizacio exitosa",result});
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al actualizar"})
    }
}

export const eliminarMascotas = async(req, resp)=>{
    try{
        const id = req.params.id_mascotas;
        const sql= `delete from mascotas where id_mascota=?`;
        const [result] = await mysql.query(sql,[id]);
        if(result.affectedRows>0)return resp.status(200).json({msg:"mascotas eliminada con exito",result});
        else{
            return resp.status(404).json({"message":"mascota no eliminado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al eliminar"})
    }
}

export const buscarMacotas = async(req, resp)=>{
    try{
        const id = req.params.id_mascotas;
        const sql= `select * from mascotas where id_mascota=?`;
        const [result] = await mysql.query(sql,[id]);
        if(result.length>0)return resp.status(200).json({msg:"mascota encontrado con exito",result});
        else{
            return resp.status(404).json({"message":"mascota no encontrado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al buscar"})
    }
}

