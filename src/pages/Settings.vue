<template>
  <div class="p-6 max-w-2xl mx-auto bg-white shadow-xl rounded-2xl space-y-6">
    <h2 class="text-2xl font-bold text-center mb-4">⚙️ Системные настройки</h2>

    <!-- Mikrotik -->
    <section>
      <h3 class="text-lg font-semibold mb-3 text-gray-700">Mikrotik API</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">IP адрес</label>
          <input v-model="env.MT_HOST" type="text" class="input" placeholder="192.168.0.165" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Пользователь</label>
          <input v-model="env.MT_USER" type="text" class="input" placeholder="razdolbay" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">Пароль</label>
          <input v-model="env.MT_PASS" type="password" class="input" placeholder="Пароль Mikrotik" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Порт Backend</label>
          <input v-model="env.PORT" type="number" class="input" placeholder="3000" />
        </div>
      </div>
    </section>

    <!-- WireGuard -->
    <section>
      <h3 class="text-lg font-semibold mb-3 text-gray-700">WireGuard</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">WG INTERFACE</label>
          <input v-model="env.WG_INTERFACE" type="text" class="input" placeholder="wg0" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">WG ENDPOINT</label>
          <input v-model="env.WG_ENDPOINT" type="text" class="input" placeholder="vpn.example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">WG PORT</label>
          <input v-model="env.WG_PORT" type="number" class="input" placeholder="51820" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">WG DNS</label>
          <input v-model="env.WG_DNS" type="text" class="input" placeholder="1.1.1.1" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium mb-1">WG PUBLICKEY</label>
          <input v-model="env.WG_PUBLICKEY" type="text" class="input font-mono text-sm" placeholder="Public key" />
        </div>
      </div>
    </section>

    <div class="text-center">
      <button
          @click="saveEnv"
          :disabled="saving"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition disabled:opacity-50"
      >
        <span v-if="saving">💾 Сохраняем...</span>
        <span v-else>💾 Сохранить настройки</span>
      </button>
      <p v-if="saved" class="text-green-600 mt-3 text-sm">✅ Сохранено успешно!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const env = ref({
  MT_HOST: '',
  MT_USER: '',
  MT_PASS: '',
  PORT: '',
  WG_INTERFACE: '',
  WG_ENDPOINT: '',
  WG_PORT: '',
  WG_DNS: '',
  WG_PUBLICKEY: ''
})

const saved = ref(false)
const saving = ref(false)

async function loadEnv() {
  try {
    const res = await fetch('/api/env')
    const data = await res.json()
    env.value = data
  } catch (err) {
    console.error('Ошибка загрузки .env:', err)
  }
}

async function saveEnv() {
  saving.value = true
  try {
    const res = await fetch('/api/env', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(env.value)
    })
    if (res.ok) {
      saved.value = true
      setTimeout(() => (saved.value = false), 3000)
    }
  } catch (err) {
    console.error('Ошибка сохранения .env:', err)
  }
  saving.value = false
}

onMounted(loadEnv)
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400;
}
</style>
