<template>

  <div style="display:flex" v-for="el of data" :key="el.id">
  <NuxtLink :to="`/hiking/${el.id}_${el.title_en}`">
    <NuxtImg :src="'img/'+el.mainImage" width="300"></NuxtImg>
  </NuxtLink>
  </div>
  {{ data }}

</template>

<script setup lang="ts">
const props = defineProps(['data'])
</script>