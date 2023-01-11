require('dotenv').config();

const express = require("express");
const cors = require('cors');
const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//NOTA: El use es conocido como un middleware
//middleware es una función que se va a ejecutar siempre para todas las lineas que sigue hacia abajo
app.use( cors() );

//Base de datos
dbConnection();

console.log( process.env )

//Rutas
//user_one
//TIveRlYFUiULAF3K
app.get('/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola mundo'
    })
})

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
} );

console.log('hola mundo');

/* 
Resumen:
1º una vez creada la carpeta del proyecto ejecutamos
npm init -y
2º Instalamos express
npm i express
3º  creamos un index.js, ponemos un console log y lo ejecutamos para probar
node index.js
4º Instalamos nodemon de forma global, escucha los cambios del proyecto de node y los levanta
npm install nodemon
4.1º Lo probamos 
nodemon index.js
4.2 Ponemos un script para ejecutar esto en el package.json
"start:dev": "nodemon index.js"
5 MONGODB: Creamos un clouster en mongo atlas, lo conectamos con nuestro compass
5.1 Instalamos mongoose y configuramos la conexión al a base de datos 
npm i mongoose
6 Varibles de entorno. Instalamos 
npm i dotdev
6.1 Creamos un fichero .env y definimos las variables de entorno, luego las sustituimos, no llevan comillas los string
En .env
    PORT=3005
En index.js
    process.env.PORT
7 Instalamos cors, sirve para permitir peticiones a nuestro backend de ciertos dominios configurados
npm i cors, luego lo ejecutamos
8 GITHUB
8.1 Creamos un respositorio en github
8.2 Preparamos el proyecto: creamos los ficheros gitignore (ponemos node_modules/) y README.md(ponemos cualquier cosa)

*/