import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import wgRoutes from './api/wgRoutes.js';

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

// ✅ Добавляем API для настроек
app.get('/api/settings', (req, res) => {
    res.json({
        MT_HOST: process.env.MT_HOST,
        MT_USER: process.env.MT_USER,
        MT_PASS: process.env.MT_PASS,
        PORT: process.env.PORT,
    });
});

app.post('/api/settings', (req, res) => {
    const { MT_HOST, MT_USER, MT_PASS, PORT } = req.body;

    const envPath = path.resolve('.env');
    const newEnv = `MT_HOST='${MT_HOST}'
    MT_USER='${MT_USER}'
    MT_PASS='${MT_PASS}'
    PORT=${PORT}`;

    // перезаписываем .env
    fs.writeFileSync(envPath, newEnv);

    // обновляем process.env без рестарта
    process.env.MT_HOST = MT_HOST;
    process.env.MT_USER = MT_USER;
    process.env.MT_PASS = MT_PASS;
    process.env.PORT = PORT;

    // также обновляем конфиг для уже запущенных роутов
    config = { host: MT_HOST, user: MT_USER, pass: MT_PASS };

    res.json({ status: 'ok' });
});

// ✅ Запуск
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ API server running on http://localhost:${PORT}`));
