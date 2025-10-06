<template>
  <div class="max-w-6xl mx-auto py-10">
    <h1 class="text-3xl font-bold mb-8 text-center">⚡ WireGuard Manager</h1>
    <WgPeersGrid />
  </div>
</template>

<script setup>
import WgPeersGrid from './components/WgPeersGrid.vue';
</script>
