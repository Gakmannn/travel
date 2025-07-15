<template>
  <header>header
    <nav style="display: flex; gap:10px">
      <NuxtLink to="/">main</NuxtLink>
      <NuxtLink to="/hiking">hiking</NuxtLink>
      <NuxtLink v-if="userStore.user" to="/lk/manage">manage</NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const userStore = useUser()
</script>