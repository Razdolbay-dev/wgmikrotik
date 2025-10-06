<template>
  <div class="min-h-screen flex flex-col bg-gray-50 text-gray-800">
    <nav class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div class="text-xl font-semibold">WireGuard Admin</div>
      <div class="space-x-4">
        <RouterLink to="/dashboard" class="hover:text-blue-300" active-class="text-blue-400">Dashboard</RouterLink>
        <RouterLink to="/peers" class="hover:text-blue-300" active-class="text-blue-400">Peers</RouterLink>
        <RouterLink to="/settings" class="hover:text-blue-300" active-class="text-blue-400">Settings</RouterLink>
      </div>
    </nav>

    <main class="flex-1 p-6">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
