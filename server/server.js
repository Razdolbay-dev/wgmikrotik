import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';

import wgRoutes from './api/wgRoutes.js';
import envRoutes from './api/envRoutes.js'; // 👈 новый импорт

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let config = {
    host: process.env.MT_HOST,
    user: process.env.MT_USER,
    pass: process.env.MT_PASS,
};

// ✅ Подключаем WireGuard API
app.use('/api/wg', wgRoutes(config));

// ✅ Новый API для .env
app.use('/api/env', envRoutes);

// ✅ Запуск
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API server running on http://localhost:${PORT}`));
