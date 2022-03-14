<template>
  <div id="app">
    <router-link v-for="item in rList" v-bind:key="item.to" :to="item.to">
      {{ item.name }}
    </router-link>
    <!-- <router-view /> -->

    <div id="container"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rList: [
        {
          name: 'vue2.1项目',
          to: '/vue2.1',
        },
        {
          name: 'vue2.2项目',
          to: '/vue2.2',
        },
        {
          name: 'vue3.0项目',
          to: '/vue3.0',
        },
        {
          name: 'react项目',
          to: '/react',
        },
      ],
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#app a {
  font-weight: bold;
  color: #2c3e50;
  padding: 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
