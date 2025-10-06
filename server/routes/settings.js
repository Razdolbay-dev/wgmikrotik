import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
const router = express.Router();

const ENV_PATH = '.env';

// Чтение настроек
router.get('/', (req, res) => {
    const env = dotenv.parse(fs.readFileSync(ENV_PATH));
    res.json(env);
});

// Обновление настроек
router.post('/', (req, res) => {
    const newEnv = req.body;
    const content = Object.entries(newEnv)
        .map(([k, v]) => `${k}='${v}'`)
        .join('\n');
    fs.writeFileSync(ENV_PATH, content);
    res.json({ status: 'ok' });
});

export default router;
