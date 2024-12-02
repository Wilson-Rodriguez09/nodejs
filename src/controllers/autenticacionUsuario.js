export const validarUsuario = async(req, resp)=>{
    try{
        const {login,password} = req.body;
        const sql= `select identificacion,nombre,rol from usuarios where identificacion=? and password=?`;
        const [result] = await mysql.query([login,password]);
        if(result.length>0)return resp.status(200).json({msg:"usuario autorizado",result});
        else{
            return resp.status(404).json({"message":"usuario no autorizado"})
        }
    }
    catch(error){
        console.log(error)
        resp.status(500).json({msg:"Error al autorizar"})
    }
}