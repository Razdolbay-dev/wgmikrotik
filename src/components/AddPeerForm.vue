<template>
  <form @submit.prevent="submit" class="p-4 border rounded bg-gray-50 mt-6">
    <h3 class="text-lg mb-2">Добавить пира</h3>
    <div class="flex flex-col gap-2">
      <select v-model="interfaceName" class="p-2 border rounded">
        <option value="">Выбери интерфейс</option>
        <option v-for="iface in interfaces" :key="iface['.id']" :value="iface.name">
          {{ iface.name }}
        </option>
      </select>
      <input
          v-model="publicKey"
          placeholder="Public Key"
          class="p-2 border rounded"
      />
      <input
          v-model="allowedAddress"
          placeholder="Allowed Address (10.10.10.x/32)"
          class="p-2 border rounded"
      />
      <button
          type="submit"
          class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Добавить
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getInterfaces, addPeer } from '../api/wgApi.js';

const interfaces = ref([]);
const interfaceName = ref('');
const publicKey = ref('');
const allowedAddress = ref('');

async function submit() {
  if (!interfaceName.value || !publicKey.value) {
    alert('Укажи интерфейс и ключ!');
    return;
  }
  await addPeer({
    interfaceName: interfaceName.value,
    publicKey: publicKey.value,
    allowedAddress: allowedAddress.value
  });
  alert('Пир добавлен!');
  publicKey.value = '';
  allowedAddress.value = '';
}

onMounted(async () => {
  interfaces.value = await getInterfaces();
});
</script>


<style scoped>

</style>