// import conecction from "./database/connection.js";
// import express from 'express';
// import cors from 'cors';
// import articule_router from "./routes/Articule_Router.js";
// import dotenvConfig from './config/config.js'

const express = require('express');
const cors = require('cors');
const connection = require("./database/connection.js");
const articule_router = require("./routes/Articule_Router.js");
const dotenvConfig = require('./config/config.js');

// Inicializa app

// Conectar a Base de datos
connection();

//Crear servidor Node
const app = express();
const PORT = dotenvConfig.PORT;

// middelwars
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api',articule_router);
app.get('/', (req,res) => {
    return res.send('<h1>Pagina de Blog con Node-JS')
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
});