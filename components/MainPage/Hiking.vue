<template>

  <div style="display:flex" v-for="el of data" :key="el.id">
    <NuxtImg :src="'img/'+el.mainImage" width="300"></NuxtImg>
  </div>
  {{ data }}

</template>

<script setup lang="ts">
const props = defineProps(['data'])
  
</script>