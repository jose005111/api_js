const express = require('express');
const app = express();
require('dotenv').config();
const delegadoRoutes = require('./routes/delegadoRoutes');
const userRoutes = require('./routes/userRoutes');
require('./database/connection'); // garante conexão na inicialização

app.use(express.json());
app.use('/delegados', delegadoRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
