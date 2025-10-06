<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold my-4">WireGuard Manager</h1>
    <WgPeersTable />
    <AddPeerForm />
  </div>
</template>

<script setup>
import WgPeersTable from './components/WgPeersTable.vue';
import AddPeerForm from './components/AddPeerForm.vue';
</script>

<style>
body {
  font-family: system-ui, sans-serif;
  background-color: #fafafa;
}
</style>
