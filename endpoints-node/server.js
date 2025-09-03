import express from 'express'
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

//iniciar el servidor
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto ${PORT}`) //`porque mezclamos string con la variable puerto
});

