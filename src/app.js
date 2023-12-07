import express from 'express'
import usuariosRoutes from "./routes/usuarios.routes.js";
import indexRoutes from "./routes/index.routes.js";
import cors from 'cors'; // Importa el paquete cors usando ES6 import
import bodyParser from 'body-parser';
//nuevo

//esto tmbien es del video
const app = express()
//

//cosas que yo meti mientras rezo que sirvan
app.use(cors());


const corsOptions = {
    origin: 'http://127.0.0.1:5501', // Permite solo solicitudes desde este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    credentials: true, // Permite el envío de credenciales (por ejemplo, cookies) en la solicitud
    optionsSuccessStatus: 204 // Devuelve un código de estado 204 en las respuestas OPTIONS
};

app.use(cors(corsOptions));

app.options('*', cors()); // Habilita las solicitudes OPTIONS para todas las rutas

app.use(bodyParser.json({limit: '35mb'}));

//cosas estandar del video

app.use(express.json())

app.use(indexRoutes)
app.use('/api', usuariosRoutes)

app.use((req, res, next) => {
    res.status(400).json({
        message: 'EndPoint no encontrado'
    })
})

export default app;