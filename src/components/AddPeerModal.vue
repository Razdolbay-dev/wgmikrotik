<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-lg w-96 p-6 relative animate-fadeIn">
      <button
          @click="$emit('close')"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <h3 class="text-xl font-semibold mb-4">Добавить Peer</h3>

      <form @submit.prevent="submit" class="flex flex-col gap-3">
        <select v-model="interfaceName" class="p-2 border rounded">
          <option value="">Выбери интерфейс</option>
          <option
              v-for="iface in interfaces"
              :key="iface['.id']"
              :value="iface.name"
          >
            {{ iface.name }}
          </option>
        </select>

        <input
            v-model="peername"
            type="text"
            placeholder="Имя пира"
            class="p-2 border rounded"
        />

        <input
            v-model="allowedAddress"
            type="text"
            placeholder="Allowed Address (10.10.10.x/32)"
            class="p-2 border rounded"
        />

        <button
            type="submit"
            class="mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Добавить
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getInterfaces, addPeer } from '../api/wgApi.js';

const props = defineProps({
  interfaces: Array
});

const emit = defineEmits(['close', 'added']);

const interfaces = ref([]);
const interfaceName = ref('');
const peername = ref('');
const allowedAddress = ref('');

async function submit() {
  if (!interfaceName.value || !peername.value) {
    alert('Укажи интерфейс и ключ!');
    return;
  }

  await addPeer({
    interfaceName: interfaceName.value,
    peername: peername.value,
    allowedAddress: allowedAddress.value
  });

  emit('added');
}

onMounted(async () => {
  interfaces.value = await getInterfaces();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
