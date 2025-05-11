const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configurado para aceitar seu frontend do Vercel
app.use(cors({
  origin: 'https://formulario-oficiais.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

require('./database/connection');

const delegadoRoutes = require('./routes/delegadoRoutes');
const userRoutes = require('./routes/userRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use('/delegados', delegadoRoutes);
app.use('/users', userRoutes);
app.use('/login', loginRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
