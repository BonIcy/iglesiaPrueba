import express from 'express';
import dotenv from 'dotenv';
import departamentoRouter from './controllers/departamento.controller.js';
import municipioRouter from './controllers/municipio.controller.js'
import comunaRouter from './controllers/comuna.controller.js';
import barrioRoutes from './controllers/barrio.controllers.js'

dotenv.config();
let app = express();
let port = process.env.PORT;

// parsear el cuerpo de las peticiones
app.use(express.json());

// Rutas
app.use('/departamentos', departamentoRouter);
app.use('/municipios', municipioRouter);
app.use('comunas', comunaRouter);
app.use('/barrios', barrioRoutes)

// correr server
app.listen(port, () => {
  console.log(`SERVER CORRIENDOSE EN http://localhost:${port}`);
});
