<template>
  <div id="app">
    <Menu
      mode="horizontal"
      :theme="theme1"
      :active-name="activeName"
      @on-select="selectHandle"
    >
      <MenuItem name="vue2.1">
        <Icon type="ios-paper" />
        vue-2.1
      </MenuItem>
      <MenuItem name="vue2.2">
        <Icon type="ios-paper" />
        vue-2.2
      </MenuItem>
      <MenuItem name="vue3.0">
        <Icon type="ios-people" />
        vue-3.0
      </MenuItem>
      <MenuItem name="react">
        <Icon type="ios-construct" />
        react
      </MenuItem>
      <MenuItem name="other">
        <Icon type="ios-construct" />
        other
      </MenuItem>
      <MenuItem name="all">
        <Icon type="ios-construct" />
        All
      </MenuItem>
    </Menu>
    <button class="btn" @click="getCookieInfo">vue</button>
    <keep-alive>
      <router-view :url="urlCf" :config="config" />
    </keep-alive>
  </div>
</template>

<script>
const cf = {
  'vue2.1': 'http://localhost:3001',
  'vue2.2': 'http://localhost:3002',
  'vue3.0': 'http://localhost:3003',
  'other': 'http://jfcoding.com/',
  'react': 'http://localhost:3000',
}
export default {
  data() {
    return {
      theme1: 'light',
      activeName: '',
      config: cf,
    }
  },
  created() {
    this.activeName = this.$route.name || 'vue2.1'
    window.localStorage.setItem('a', 9999)
    this.$cookie.set('test', 'Hello world!')
  },
  methods: {
    selectHandle(e) {
      this.activeName = e
      this.$router.push('/' + e)
    },
    getCookieInfo() {
      console.log('parent iframe start')
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
      console.log('parent iframe end')
    },
  },
  computed: {
    urlCf() {
      return cf[this.$route.name] || cf['vue2.1']
    },
  },
}
</script>
<style>
button {
  background: red;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
html,
body {
  height: 100%;
  width: 100%;
}
iframe {
  width: 100%;
}
.btn {
  position: fixed;
  right: 30px;
  top: 5px;
  z-index: 1000;
  width: 100px;
  height: 50px;
}
</style>
