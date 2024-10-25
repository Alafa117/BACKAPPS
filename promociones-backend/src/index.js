// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const codeRoutes = require('./routes/code.routes');

// Inicializar la aplicación de Express
const app = express();

// Middleware
app.use(express.json()); // Para poder recibir JSON
app.use(cors()); // Para permitir el acceso de otros dominios

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/code', codeRoutes); // Rutas relacionadas al código

// Conectar a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión exitosa a la base de datos');
}).catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
});

// Definir el puerto
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
