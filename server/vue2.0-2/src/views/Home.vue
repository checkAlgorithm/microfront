<template>
  <div class="home">
    <img src="../assets/logo.png" />

    <h1>This is an home page</h1>
    <button @click="getCookieInfo">Default button</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
     getCookieInfo() {
      console.log('parent iframe start')
      console.log('cookie:', document.cookie)
      console.log('localStorage:',window.localStorage.getItem('a'), window.localStorage.getItem('vue2.1-a'))
      console.log('parent iframe end')
    }
  }
};
</script>
