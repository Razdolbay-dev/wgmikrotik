import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

const router = express.Router();
const ENV_PATH = path.resolve('.env');

// 📖 Получить текущее содержимое .env
router.get('/', (req, res) => {
    try {
        const env = dotenv.parse(fs.readFileSync(ENV_PATH, 'utf-8'));
        res.json(env);
    } catch (err) {
        console.error('Ошибка при чтении .env:', err);
        res.status(500).json({ error: 'Не удалось прочитать .env' });
    }
});

// 💾 Обновить .env
router.post('/', (req, res) => {
    try {
        const newEnv = req.body;

        // Преобразуем объект в формат .env
        const content = Object.entries(newEnv)
            .map(([key, value]) => `${key}='${value}'`)
            .join('\n');

        fs.writeFileSync(ENV_PATH, content);

        // Мгновенно обновляем process.env
        for (const [k, v] of Object.entries(newEnv)) {
            process.env[k] = v;
        }

        res.json({ status: 'ok' });
    } catch (err) {
        console.error('Ошибка при записи .env:', err);
        res.status(500).json({ error: 'Не удалось обновить .env' });
    }
});

export default router;
