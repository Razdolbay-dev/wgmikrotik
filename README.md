# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

🚀 Пример запроса из браузера / Postman

```shell
GET http://localhost:3000/api/wg/interfaces
GET http://localhost:3000/api/wg/peers
GET http://localhost:3000/api/wg/peers/wg0
POST http://localhost:3000/api/wg/peer
Content-Type: application/json

{
  "interfaceName": "wg0",
  "publicKey": "BASE64KEY==",
  "allowedAddress": "10.10.10.7/32"
}

```

MT_HOST='192.168.0.165'
MT_USER='razdolbay'
MT_PASS='kjifHm11.06!'
PORT=3000
WG_INTERFACE='wg0'
WG_ENDPOINT='vpn.example.com'
WG_PORT='51820'
WG_DNS='1.1.1.1'
WG_PUBLICKEY='MikrotikPublicKeyHere'
