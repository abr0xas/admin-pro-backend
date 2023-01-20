require('dotenv').config();

const express = require("express");
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crear el servidor de express
const app = express();

//NOTA: El use es conocido como un middleware
//middleware es una función que se va a ejecutar siempre para todas las lineas que sigue hacia abajo
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/hospitales', require('./routes/hospitales'));
app.use( '/api/medicos', require('./routes/medicos'));
app.use( '/api/todo', require('./routes/busquedas'));
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/uploads', require('./routes/uploads'));

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
8 GITHUB (PRIMERA VEZ)
8.1 Creamos un respositorio en github
8.2 Preparamos el proyecto: creamos los ficheros gitignore (ponemos node_modules/) y README.md(ponemos cualquier cosa)
8.3 en consola inicializamos git, después todos los ficheros se pondrán en verde menos los de gitignore
git init
8.4 Añadimos los ficheros que vamos a subir, en este caso todos
git add .
8.5  Creamos el commit
git commit -m "CORS y Express -primer commit"
8.6 Pegamos en consola las lineas que copiamos al crear el respositorio
git remote add origin https://github.com/abr0xas/admin-pro-backend.git
git branch -M main
git push -u origin main

8.7 creamos tag
git tag -a v0.1.0 -m "inicio de backend"
8.8 subimos tag
git tag -a v0.1.0 -m "inicio de backend"
8.9 En github vamos al tag y creamos la realise

Lo anterior ha sido para crear un proyecto de cero, lo siguiente serán notas de las instalaciones y otras cosas.
9. Empezamos a crear los controllers, publicar los endpoinds, para ello se sigue una estructura muy determinada. 
Hay carpeta de controolers, otra de rutas, otra de modelo, y todo empieza en el index.
9.1  Al hacer peticiones post, enviamos datos a nuestra app, es importantes esta linea:
app.use( express.json() );  lectura y parsea o body. Esto es un middleware
9.2  Instalamos express- validator  que va a validar los campos enviados a lso endpoinds

10.Hemos creado middlewares para validar
MIDDLEWARE
Son funciones que se ejecutan antes de llegar a otras,
Otra función es que la información venga como se espera.

11. Encriptamos las contraseñas
npm i bcryptjs

*/