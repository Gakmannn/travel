<template>
  <div class="tabs" v-if="!userStore.user">
    <input type="radio" id="tab-login" name="tab-group" checked @click="isAuth=true">
    <label for="tab-login" style="width:81px" class="tab-title">Вход</label>
    <input type="radio" id="tab-register" name="tab-group" @click="isAuth=false">
    <label for="tab-register" style="width:140px" class="tab-title">Регистрация</label>
    <br>
      <!-- Вкладка Входа -->
    <div class="tab" v-if="isAuth">
      <div class="tab-content">
        <form class="lk_entrance" @submit.prevent="handleLogin">
          <input type="email" v-model="user.email" placeholder="Введите почту" required>
          <input type="password" v-model="user.password" placeholder="Введите пароль" required>
          <button type="submit">Войти</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    </div>

      <!-- Вкладка регистрации -->
      <div class="tab" v-else>
      <div class="tab-content">
        <form class="lk_entrance" @submit.prevent="handleRegister">
          <input type="email" v-model="user.email" placeholder="Введите почту" required>
          <input type="password" v-model="user.password" placeholder="Введите пароль" required>
          <input type="password" v-model="user.password2" placeholder="Повторите пароль" required>
          <button type="submit">Зарегистрироваться</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUser()

const isAuth = ref(true)
const user = ref({} as {email:string, password:string, password2?:string})
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = await userStore.logIn(user.value.email, user.value.password)
  if (userStore.user && userStore.user.approved) {
    await navigateTo(`/lk/manage`)
  } 
}
const handleRegister = async () => {
  if (user.value.password == user.value.password2) {
    errorMessage.value = await userStore.regIn(user.value.email, user.value.password)
    if (userStore.user) {
      errorMessage.value = 'вы зарегистрированы. Ожидайте подтверждения'
    } 
  } else {
    errorMessage.value = 'пароли не совпадают'
  }
}
</script>