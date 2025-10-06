import express from 'express';
import { sendCommand } from '../lib/routerosClient.js';

const router = express.Router();

export default (config) => {
    // Получить все WireGuard интерфейсы
    router.get('/interfaces', async (req, res) => {
        try {
            const data = await sendCommand(config, ['/interface/wireguard/print']);
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Получить всех пиров
    router.get('/peers', async (req, res) => {
        try {
            const data = await sendCommand(config, ['/interface/wireguard/peers/print']);
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Получить пиров конкретного интерфейса
    router.get('/peers/:iface', async (req, res) => {
        try {
            const iface = req.params.iface;
            const data = await sendCommand(config, ['/interface/wireguard/peers/print', `?interface=${iface}`]);
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Добавить пира
    router.post('/peer', async (req, res) => {
        const { interfaceName, publicKey, allowedAddress } = req.body;
        if (!interfaceName || !publicKey) return res.status(400).json({ error: 'Missing fields' });

        try {
            await sendCommand(config, [
                '/interface/wireguard/peers/add',
                `=interface=${interfaceName}`,
                `=public-key=${publicKey}`,
                `=allowed-address=${allowedAddress || ''}`
            ]);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Удалить пира
    router.delete('/peer/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await sendCommand(config, ['/interface/wireguard/peers/remove', `=.id=${id}`]);
            res.json({ success: true });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
};
