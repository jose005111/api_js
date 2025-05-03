const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: 'http://oficiais-qxhfnvouj-feliciano-rodinos-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
  

app.use(express.json());

// Banco de dados
require('./database/connection');

// Rotas
const delegadoRoutes = require('./routes/delegadoRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/delegados', delegadoRoutes);
app.use('/users', userRoutes);

// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
