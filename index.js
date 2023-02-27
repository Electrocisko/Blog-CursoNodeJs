import conecction from "./database/connection.js";
import express from 'express';
import cors from 'cors';
import articule_router from "./routes/Articule_Router.js";
// Inicializa app

// Conectar a Base de datos
conecction();

//Crear servidor Node
const app = express();
const PORT = 8080;

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