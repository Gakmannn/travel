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
    <input type="text" v-model="tempHiking.mainImage" placeholder="mainImage">
    <input type="file" @change="handleFile" placeholder="add image">
    <span>Active <input type="checkbox" v-model="tempHiking.active"></span>
    <span>Primary<input type="checkbox" v-model="tempHiking.primary"></span>
    <span>image             Image[]</span>
    <span>reviews           Reviews[]</span>
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
  price:number
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
const tempHiking = ref({} as Hiking)
if (!userStore.user) {
  await navigateTo(`/`)
}
const route = useRoute()
const num = route.query.page ? +route.query.page : 1
const {data} = await useFetch(`/api/hiking/pagination/${num}`)
const toManage = (el:any) => {
  tempHiking.value = el as Hiking
}
const clearForm = () => {
  tempHiking.value = {} as Hiking
}
const handleSubmit = async () => {
  console.log('handleSubmit')
}
const makeTitleEn = (e:Event)=>{
  tempHiking.value.title_en = translit(tempHiking.value.title)
}
const handleFile = (e:Event)=>{

}
</script>