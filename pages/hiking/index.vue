<template>
  <HikingPageList  :data="data"></HikingPageList>
</template>

<script setup lang="ts">
  const route = useRoute()
  const num = +route.query.page || 1 as number
  const {data} = await useFetch(`/api/hiking/pagination/${num}`)
  
// useSeoMeta({
//   title: data.value.title,
//   ogTitle: data.value.title,
//   description: data.value.description,
//   ogDescription: data.value.description,
//   // !!! Указать имя домена
//   ogImage: 'https://domain.ru/'+data.value.mainImage,
//   twitterCard: 'summary_large_image',
// })

</script>