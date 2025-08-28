<template>
  Admin page
  <form @submit.prevent="handleSubmit" style="display:flex; flex-direction:column; width: 500px; gap:5px">
    <input type="text" @input="makeTitleEn" v-model="tempHiking.title" placeholder="title">
    <input type="text" v-model="tempHiking.title_en" placeholder="title_en">
    <input type="text" v-model="tempHiking.description" placeholder="description">
    <input type="text" v-model="tempHiking.meta_title" placeholder="meta_title">
    <input type="text" v-model="tempHiking.meta_description" placeholder="meta_description">
    <input type="text" v-model="tempHiking.meta_keywords" placeholder="meta_keywords">
    <span><input type="text" v-model="tempHiking.price" placeholder="price">P.</span>
    <input type="file" multiple ref="file" @change="handleFile" placeholder="add image">
    <div class="preview-container">
      <div v-for="(image, index) in previewImages" :key="index" class="preview-item">
        <img :src="image" style="width:300px" alt="Превью" class="preview-image" />
        <button @click.prevent="removeImage(index)" class="remove-button">×</button>
      </div>
    </div>
    <span>Active <input type="checkbox" v-model="tempHiking.active"></span>
    <span>Primary<input type="checkbox" v-model="tempHiking.primary"></span>
    <span>image Image[]</span>
    <span>reviews Reviews[]</span>
    <input type="submit" value="send">
  </form>
  <button style="width: 500px; margin:5px 0" @click="clearForm">Clear</button>
  <div style="display:flex" v-for="el of data" :key="el.id">
    <NuxtImg @click="toManage(el)" :src="'img/'+el.mainImage" width="300"></NuxtImg>
  </div>
</template>

<script setup lang="ts">
import { translit } from '@@/lib/translit'
const userStore = useUser()
type Hiking = {
  id?:number
  title:string
  title_en:string  
  description:string
  meta_title:string    
  meta_description:string    
  meta_keywords:string    
  price:string
  mainImage:string
  active:boolean
  primary:boolean
  image:{
    id?: number
    img:string   
    hiking_id:number
  }[]
  reviews:{}[]
}

let files = [] as any[]
const file = ref(null)
const newName = ref('')
const previewImages = ref([] as any[])
const tempHiking = ref({} as Hiking)
if (!userStore.user) {
  await navigateTo(`/`)
}
const route = useRoute()
const num = route.query.page ? +route.query.page : 1
const {data, refresh} = await useFetch(`/api/hiking/pagination/${num}`)
const toManage = (el:any) => {
  tempHiking.value = el as Hiking
}
const clearForm = () => {
  tempHiking.value = {} as Hiking
}
const handleSubmit = async () => {
  const fileref = file.value as never as HTMLInputElement
  if (Number.isNaN(Number(tempHiking.value.price.replaceAll(' ', '').replaceAll(',', '.')))) return alert('Проверьте сумму')
  if (!files.length && !tempHiking.value.id) return alert('Нужно добавить картинок')
  if (!tempHiking.value.description) return alert('Нужно добавить описание')
  if (!tempHiking.value.meta_title) return alert('Нужно добавить мета заголовок')
  if (!tempHiking.value.meta_description) return alert('Нужно добавить мета описание')
  if (!tempHiking.value.meta_keywords) return alert('Нужно добавить ключи')
  const fD = new FormData()
  fD.append('data', JSON.stringify(tempHiking.value))
  fD.append('newName', tempHiking.value.title_en)
  for (let i = 0; i < files.length; i++) {
    fD.append('img' + i, files[i])
  }
  if (tempHiking.value.id) {
    await $fetch('/api/hiking', {
      method: 'PUT',
      body: fD
    })
  } else {
    await $fetch('/api/hiking', {
      method: 'POST',
      body: fD
    })
  }
  
  newName.value = ''
  fileref.value = ''
  tempHiking.value = {} as Hiking
  previewImages.value = []

  refresh()
}
const makeTitleEn = (e:Event)=>{
  tempHiking.value.title_en = translit(tempHiking.value.title)
}
const handleFile = (e:Event)=>{
  const target = e.target as HTMLInputElement
  // @ts-ignore
  files = Array.from(target.files) || [] as any[]
  console.log(files)
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onload = (e) => {
        previewImages.value.push(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }
}
const removeImage = (index: number) => {
  previewImages.value.splice(index, 1)
  files.splice(index, 1)
}
</script>