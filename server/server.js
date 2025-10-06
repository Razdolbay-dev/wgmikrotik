import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import wgRoutes from './api/wgRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const config = {
    host: process.env.MT_HOST,
    user: process.env.MT_USER,
    pass: process.env.MT_PASS
};

app.use('/api/wg', wgRoutes(config));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API server running on http://localhost:${PORT}`));
