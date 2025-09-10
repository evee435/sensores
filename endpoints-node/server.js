import express from 'express';
import pool from "./db.js";
const app = express(); //servidor creado

const PORT = 3000; //constante real, no cambia su valor(mayuscula)

app.use(express.json());

app.get('/', (req, res)=> {
    res.send('este es un endpoint hecho con express')
});


//endpoint con parametro
app.get('/api/user/:id', (req, res)=> {
    //destructuracion
    const {id} = req.params; //dato o variable que queremos utilizar, va entre {}captura valor de algun objeto
    res.json({message: `el usuario con id ${id} es pepito`});
});

app.get('/api/search', (req,res) => {
    const{name, lastname} =req.query
    res.json({
        firstName: name,
        lastname,
    });
    //http://localhost:PUERTO/api/search?name=Evelyn&lastname=Villarreal
})

//endpoint POST
app.post('/api/user', (req, res) => {
    const {name, email} = req.body
    res.json({message: 'Usuario Creado', data: {name, email}});
});

//PUT
app.put("api/user/:id", (req, res)=>{
    const {id} = req.params
    const {name, email} =req.body

    res.json({ //respuesta en formato json
        message: `este es el usuario con id ${id} `,
        data: {name, email},
    });
});

//DELETE 
app.delete('/api/user/:id' , (req, res)=> {
    const {id} = req.params
    res.json({ message : `usuario con ID ${id} eliminado`});
});

//endpoints DB
//GET
app.get('/api/products', async(req, res)=>{ //la manera en la que se ejecuta la funcion, manera asincronica
    try{
        //codigo a probar 
        const [rows] = await pool.query("SELECT * FROM productos") //espera
        res.json(rows)
    }catch(error){
        console.log(error)
        res.status(500).json({error: "error en la consulta"});
    }
    //try y catch para saber cual es el problema que se nos ejecuta

});

//iniciar el servidor
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto ${PORT}`) //`porque mezclamos string con la variable puerto
});

