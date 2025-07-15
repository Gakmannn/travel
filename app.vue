<template>

  <HeaderComponent />
  <NuxtPage />
  <FooterComponent />

</template>

<script setup lang="ts">
onMounted(()=>{
  if (localStorage.user) {
    const userStore = useUser()
    userStore.autoLogin()
  }
})
</script>