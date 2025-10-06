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

    <div v-if="loading" class="text-center text-gray-500">Загрузка...</div>

    <div
        v-else-if="peers.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <div
          v-for="peer in peers"
          :key="peer['.id']"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
      >
        <div class="p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold text-gray-800">
              {{ peer.name || 'Без имени' }}
            </h3>
            <span
                class="text-xs px-2 py-1 rounded-full"
                :class="peer.disabled === 'true'
                ? 'bg-red-100 text-red-600'
                : 'bg-green-100 text-green-600'"
            >
              {{ peer.disabled === 'true' ? 'Отключен' : 'Активен' }}
            </span>
          </div>

          <div class="text-sm text-gray-600 space-y-1">
            <p><span class="font-medium">Interface:</span> {{ peer.interface }}</p>
            <p><span class="font-medium">Allowed:</span> {{ peer['allowed-address'] }}</p>
            <p><span class="font-medium">Public Key:</span></p>
            <p class="font-mono text-xs break-all text-gray-500">
              {{ peer['public-key'] }}
            </p>

            <div class="border-t my-2"></div>

            <p>
              <span class="font-medium">Endpoint:</span>
              {{ peer['current-endpoint-address'] || '—' }}:
              {{ peer['current-endpoint-port'] || '—' }}
            </p>
            <p>
              <span class="font-medium">Last Handshake:</span>
              {{ peer['last-handshake'] || '—' }}
            </p>
            <p>
              <span class="font-medium">RX / TX:</span>
              {{ formatBytes(peer.rx) }} / {{ formatBytes(peer.tx) }}
            </p>
          </div>
        </div>

        <div class="flex justify-end bg-gray-50 px-4 py-2">
          <button
              @click="removePeer(peer['.id'])"
              class="text-sm text-red-600 hover:text-red-800"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center mt-6">
      Нет пиров для отображения
    </div>

    <AddPeerModal
        v-if="showAddModal"
        @close="showAddModal = false"
        @added="onPeerAdded"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AddPeerModal from './AddPeerModal.vue';
import { getPeers, deletePeer } from '../api/wgApi.js';

const peers = ref([]);
const loading = ref(true);
const showAddModal = ref(false);

async function loadPeers() {
  loading.value = true;
  peers.value = await getPeers();
  loading.value = false;
}

async function removePeer(id) {
  if (!confirm('Удалить пира?')) return;
  await deletePeer(id);
  await loadPeers();
}

function onPeerAdded() {
  showAddModal.value = false;
  loadPeers();
}

function formatBytes(bytes) {
  const num = parseInt(bytes);
  if (isNaN(num)) return '0 B';
  if (num < 1024) return `${num} B`;
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)} KB`;
  if (num < 1024 * 1024 * 1024) return `${(num / 1024 / 1024).toFixed(1)} MB`;
  return `${(num / 1024 / 1024 / 1024).toFixed(1)} GB`;
}

onMounted(loadPeers);
</script>
