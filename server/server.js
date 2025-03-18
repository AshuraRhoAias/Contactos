import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import usersRoutes from './routes/users.routes.js';
import path from 'path'



const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// En tu archivo del servidor Express
// Alternativa más simple
app.use('/', express.static(path.join(__dirname)));

app.use('/contactos', usersRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});