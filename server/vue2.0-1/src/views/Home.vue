<template>
  <div class="home">
    <img src="../assets/logo.png" />
    <h1>This is an home page</h1>
    <button @click="getCookieInfo">get cookie info</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  created() {
    window.localStorage.setItem('vue2.1-a', 9999)
    this.$cookie.set('vue2.1-test', 'vue2.1-Hello world!')
  },
  methods: {
    getCookieInfo() {
      console.log('vue2.0-1 start')
      console.log(
        'cookie:',
        this.$cookie.get('vue2.1-test'),
        this.$cookie.get('test')
      )
      console.log(
        'localStorage:',
        window.localStorage.getItem('a'),
        window.localStorage.getItem('vue2.1-a')
      )
      console.log('vue2.0-1 end')
    },
  },
}
</script>
