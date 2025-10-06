<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">WireGuard Peers</h2>

    <select v-model="selectedInterface" @change="loadPeers" class="mb-4 p-2 border rounded">
      <option value="">Все интерфейсы</option>
      <option v-for="iface in interfaces" :key="iface['.id']" :value="iface.name">
        {{ iface.name }}
      </option>
    </select>

    <table class="w-full border-collapse border">
      <thead>
      <tr class="bg-gray-100">
        <th class="border p-2">Interface</th>
        <th class="border p-2">Public Key</th>
        <th class="border p-2">Allowed Address</th>
        <th class="border p-2">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="peer in peers" :key="peer['.id']">
        <td class="border p-2">{{ peer.interface }}</td>
        <td class="border p-2 font-mono">{{ peer['public-key'] }}</td>
        <td class="border p-2">{{ peer['allowed-address'] }}</td>
        <td class="border p-2">
          <button @click="removePeer(peer['.id'])" class="text-red-500 hover:underline">
            Удалить
          </button>
        </td>
      </tr>
      <tr v-if="!peers.length">
        <td colspan="4" class="text-center p-4 text-gray-400">Нет пиров</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getInterfaces, getPeers, deletePeer } from '../api/wgApi.js';

const interfaces = ref([]);
const peers = ref([]);
const selectedInterface = ref('');

async function loadPeers() {
  peers.value = await getPeers(selectedInterface.value);
}

async function loadInterfaces() {
  interfaces.value = await getInterfaces();
}

async function removePeer(id) {
  if (!confirm('Удалить пира?')) return;
  await deletePeer(id);
  await loadPeers();
}

onMounted(async () => {
  await loadInterfaces();
  await loadPeers();
});
</script>

<style scoped>

</style>