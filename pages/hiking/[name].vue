<template>
  <HikingPageEvent :data="data"></HikingPageEvent>
</template>

<script setup lang="ts">

// const data = await Promise.all([useFetch(`/api/hiking/pagination/1`), useFetch('/api/hiking/main')])
// const all = data[0].data
// const main = data[1].data

const route = useRoute()
const id = route.params.name && typeof route.params.name=='string' ? parseInt(route.params.name) : 1
const {data} = await useFetch(`/api/hiking/${id}`)
// if (`${id}_${data.value.title_en}`!==route.params.name) {
//   await navigateTo(`/hiking/${id}_${data.value.title_en}`)
// }

if (data.value) {
  useSeoMeta({
    title: data.value.meta_title,
    ogTitle: data.value.meta_title,
    description: data.value.meta_description,
    ogDescription: data.value.meta_description,
    keywords: data.value.meta_keywords,
    // !!! Указать имя домена
    ogImage: 'https://domain.ru/'+data.value.mainImage,
    twitterCard: 'summary_large_image',
  })
}
const micro = [
  // !!! Нужен event
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
] as any
useHead({
  script: [ { type:'application/ld+json', innerHTML: micro} ]
})
</script>