# Vue 3 + Vite (NodeJS ESM modal)

Надоело лазить в роутер и создавать конфиги вручную. OpenSource обертка для Mikrotik API

Содержимое ```.env```
```dotenv
MT_HOST='mt_ip'
MT_USER='api_user'
MT_PASS='api_pass'
PORT=3000 #Backend port
WG_INTERFACE='wg_iface_mt'
WG_ENDPOINT='ip/dns_mt'
WG_PORT='51820'
WG_DNS='1.1.1.1'
WG_PUBLICKEY='MikrotikPublicKeyHere'
```
Видит всех пиров , может удалять пиров, добавлять. Не редактирует (пока что, но это не точно).
Кому интересно форкайте

Установка простая :
1. Настраиваем Mikrotik , создаем интерфейс , рисуем роутинги и так далее
2. Заполняем .env
3. клонируем проект
4. npm install
5. npm run dev

Работаем