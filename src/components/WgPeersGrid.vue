<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">WireGuard Peers</h2>
      <button
          @click="showAddModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Добавить Peer
      </button>
    </div>

    <select
        v-model="selectedInterface"
        @change="loadPeers"
        class="p-2 border rounded mb-6"
    >
      <option value="">Все интерфейсы</option>
      <option
          v-for="iface in interfaces"
          :key="iface['.id']"
          :value="iface.name"
      >
        {{ iface.name }}
      </option>
    </select>

    <div
        v-if="peers.length"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <div
          v-for="peer in peers"
          :key="peer['.id']"
          class="bg-white shadow-md rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition"
      >
        <div>
          <div class="font-semibold text-lg mb-2">{{ peer.interface }}</div>
          <div class="text-sm text-gray-600 mb-1">
            <span class="font-medium">Public Key:</span>
            <span class="font-mono text-xs break-all">{{ peer['public-key'] }}</span>
          </div>
          <div class="text-sm text-gray-600">
            <span class="font-medium">Allowed:</span>
            {{ peer['allowed-address'] }}
          </div>
        </div>

        <button
            @click="removePeer(peer['.id'])"
            class="mt-4 self-end text-red-600 hover:text-red-800 text-sm"
        >
          Удалить
        </button>
      </div>
    </div>

    <div
        v-else
        class="text-center text-gray-500 text-sm mt-6"
    >
      Нет пиров для отображения
    </div>

    <AddPeerModal
        v-if="showAddModal"
        :interfaces="interfaces"
        @close="showAddModal = false"
        @added="onPeerAdded"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getInterfaces, getPeers, deletePeer } from '../api/wgApi.js';
import AddPeerModal from './AddPeerModal.vue';

const peers = ref([]);
const interfaces = ref([]);
const selectedInterface = ref('');
const showAddModal = ref(false);

async function loadInterfaces() {
  interfaces.value = await getInterfaces();
}

async function loadPeers() {
  peers.value = await getPeers(selectedInterface.value);
}

async function removePeer(id) {
  if (!confirm('Удалить пира?')) return;
  await deletePeer(id);
  await loadPeers();
}

async function onPeerAdded() {
  showAddModal.value = false;
  await loadPeers();
}

onMounted(async () => {
  await loadInterfaces();
  await loadPeers();
});
</script>

<style scoped>

</style>