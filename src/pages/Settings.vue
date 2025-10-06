<template>
  <div class="max-w-lg mx-auto bg-white shadow rounded-xl p-6">
    <h2 class="text-2xl font-semibold mb-4">Настройки подключения к MikroTik</h2>

    <form @submit.prevent="saveSettings" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">MT_HOST</label>
        <input v-model="settings.MT_HOST" class="w-full border rounded p-2" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">MT_USER</label>
        <input v-model="settings.MT_USER" class="w-full border rounded p-2" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">MT_PASS</label>
        <input
            type="password"
            v-model="settings.MT_PASS"
            class="w-full border rounded p-2"
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">PORT</label>
        <input v-model="settings.PORT" type="number" class="w-full border rounded p-2" />
      </div>

      <div class="pt-4 flex justify-end">
        <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          💾 Сохранить
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const settings = ref({
  MT_HOST: '',
  MT_USER: '',
  MT_PASS: '',
  PORT: '',
});

async function loadSettings() {
  const res = await fetch('/api/settings');
  settings.value = await res.json();
}

async function saveSettings() {
  await fetch('/api/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings.value),
  });
  alert('Настройки сохранены!');
}

onMounted(loadSettings);
</script>


<style scoped>

</style>