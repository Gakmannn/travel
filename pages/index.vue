<template>
  <MainPageTitle></MainPageTitle>
  <MainPageHiking :data="data"></MainPageHiking>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/hiking/main')

useSeoMeta({
  // title: data.value.title,
  // ogTitle: data.value.title,
  // description: data.value.description,
  // ogDescription: data.value.description,
  // // !!! Указать имя домена
  // ogImage: 'https://domain.ru/' + data.value.mainImage,
  // twitterCard: 'summary_large_image',
})
const micro = [
  // !!! Нужен organisation
  // {
  //   "@context":"https://schema.org/",
  //   "@type":"ImageObject",
  //   "contentUrl": 'https://domain.ru'+post.value.img,
  //   "license":"https://creativecommons.org/licenses/by/4.0/",
  //   "copyrightNotice":"© 2025 Inspiration. Использование разрешено с указанием авторства.",
  //   "creditText":`Фото: ${post.value.author.pseudo ? post.value.author.pseudo : post.value.author.email } / domain.ru`,
  //   "acquireLicensePage":"https://domain.ru/terms_of_use",
  //   "datePublished":post.value.created_at,
  //   "description": post.value.title,
  //   "creator":{
  //     "@type":"Person",
  //     "name": `${post.value.author.pseudo ? post.value.author.pseudo : post.value.author.email }`
  //   }
  // },
  // {
  //   "@context":"http://schema.org",
  //   "@type":"Article",
  //   "mainEntityOfPage": {
  //     "@type":"WebPage",
  //     "@id":`https://domain.ru/${post.value.rubric.title_en.toLowerCase()}/${post.value.id}_${post.value.title_en}`,
  //   },
  //   "headline":post.value.title,
  //   "datePublished":post.value.created_at,
  //   "dateModified":post.value.updated_at,
  //   "author": {
  //     "@type":"Person",
  //     "name": `${post.value.author.pseudo ? post.value.author.pseudo : post.value.author.email }`
  //   },
  //   "publisher":{
  //     "@type":"Organization",
  //     "name":"Inspiration",
  //     "logo": {
  //       "@type":"ImageObject",
  //       "url":"https://domain.ru/favicon.ico"
  //     }
  //   },
  //   "description":post.value.preview,
  //   "url":`https://domain.ru/${post.value.rubric.title_en.toLowerCase()}/${post.value.id}_${post.value.title_en}`,
  //   "image":[
  //     'https://domain.ru'+post.value.img,
  //   ]
  // }
]
useHead({
  script: [{ type: 'application/ld+json', innerHTML: micro }]
})
</script>