import { mysql } from "../databases/conexion.js";
import jwt from 'jsonwebtoken'

export const validarUsuario = async(req, resp)=>{
    try{
        const {login,password} = req.body;
        const sql= `select identificacion,nombre,rol from usuarios where identificacion=? and password=?`;
        const [result] = await mysql.query(sql,[login,password]);
        if(result.length>0){
            let token = jwt.sign({user:result},process.env.SECRET,{expiresIn:process.env.TIME});
            return resp.status(200).json({msg:"usuario autorizado",result,token});}
        else{
            return resp.status(404).json({"message":"usuario no autorizado"})
        }
        
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al autorizar"})
    }
}

export const validarToken =(req, resp, next)=>{
    let token_usuario = req.headers['authorization']?.split(" ")[1];
    if(!token_usuario)
        return resp.status(403).json({msg:"Token es requerido"})
    let decoded = jwt.verify(token_usuario,process.env.SECRET,(error,decoded)=>{
        if(error) return resp.status(403).json({msg:"El token no esta autorizado"});
            else next();
    });
}