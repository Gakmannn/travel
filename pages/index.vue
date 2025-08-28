<template>
  <MainPageTitle></MainPageTitle>

  <div>
    <label>
      <input type="checkbox" v-model="selectedItems" value="item1"> Item 1
    </label>
    <label>
      <input type="checkbox" v-model="selectedItems" value="item2"> Item 2
    </label>
    <label>
      <input type="checkbox" v-model="selectedItems" value="item3"> Item 3
    </label>
    <p>Выбранные элементы: {{ selectedItems }}</p>
  </div>
  <label>
    <input type="checkbox" v-model="dopItems.item4" value="item4"> Item 4
  </label>
  <label>
    <input type="checkbox" v-model="dopItems.item5" value="item5"> Item 5
  </label>
  <label>
    <input type="checkbox" v-model="dopItems.item6" value="item6"> Item 6 ne sochetaetsia s 4 i 5
  </label>
  <p v-if="dopItems.item6">Выбранные элементы: {{ dopItems }}</p>

  <MainPageHiking :data="data"></MainPageHiking>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/hiking/main')
const selectedItems = ref([])
const dopItems = reactive({
  item4: false,
  item5: true,
  item6: false,
})

watch(()=>dopItems.item6, (newVal)=>{
  if (newVal) {
    console.log(6)
    dopItems.item4 = false
    dopItems.item5 = false
  }
})

watch(dopItems, () => {
  if (dopItems.item6 && (dopItems.item4 || dopItems.item5)) {
    console.log('4||5')
    dopItems.item6 = false
  }
})

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
] as any
useHead({
  script: [{ type: 'application/ld+json', innerHTML: micro }]
})
</script>