const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.set('port', process.env.PORT || 3306);

app.use(bodyParser.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'semint'
});

conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});


app.listen(4000, () => {
    console.log(`Servidor web iniciado en el puerto 3306 `);
});

module.exports = conexion;
