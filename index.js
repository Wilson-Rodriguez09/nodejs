import express from "express";
import usuario from './src/routers/usuarioRouter.js';
import categoria from './src/routers/categoriaRouter.js';
import mascotas from './src/routers/mascotasRouter.js';
import login from './src/routers/autenticacionRouter.js';
import bodyParser from "body-parser"

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extends:false}))
app.use(usuario)
app.use(categoria)
app.use(mascotas)
app.use(express.static('./public'));
//Autorizacion y validacion de token
app.use(login)

//Configuracion del motot de plantilla ejs
app.set('views','./src/views');
app.set('view engine', 'ejs')

app.get('/documents',(req,res)=>{
    res.render('documents.ejs')
})


app.listen(3000,()=>{
    console.log("servidor iniciado en el puerto 3000")
});