//Importamos dependencias
const express = require('express');
const colors = require('colors');

//inicializamos APP
const app = express();
app.use(express.json());

// definimos puerto
const PORT = 8821;
let fecha = new Date();
app.listen(PORT,()=>console.log(`Servidor express iniciado en ${PORT} -- ${fecha}`.bgGreen));

//endpoints
app.get('/',(req, res)=> res.send('Hello World!'));

//Add datos de prueba
let movies = [
    {id:1, title: "Soy Leyenda"},
    {id:2, title: "El Risas"},
    {id:3, title: "Yo Robot"},
    {id:4, title: "El Hoyo"}
];

//CRUD 
app.get('/movies', (req, res) => {
    res.json(movies);
});


//Metodo GET - READ por ID
app.get('/movies/:id', (req, res) => {
    const {id} = req.params;
    let movie = movies.find(movie => movie.id == id);
    res.json(movie);
});

//Metodo POST - CREATE
app.post('/movies', (req, res) => {
    const id = req.body.id;
    const title = req.body.title;
    const movie = {id, title};
    movies.push(movie);
    res.json(movie);
});

//Metodo PUT - UPDATE
app.put('/movies/:id', (req, res) => {
    //Recuperar variables
    const {id} = req.params;
    const {title} = req.body;
    //Check existe registro
    let movieList = movies.filter(movie => movie.id != id);

    let movie = {id, title};
    movieList.push(movie);
    
    movies = movieList;

    res.json(movie);
});

//Metodo DELETE
app.delete('/movies/:id', (req, res) => {
    const {id} = req.params;
    let movieList = movies.filter(movie => movie.id != id);
    movies = movieList;
    res.send(`Registro ${id} eliminado`);
});