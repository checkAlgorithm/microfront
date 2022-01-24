<template>
  <div class="about">
      <iframe v-for="(item, index) in urls" v-bind:key="index" :src="item" />
  </div>
</template>
<script>
export default {
  props:{
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      urls: []
    }
  },
  created() {
    this.urls = Object.values(this.config)
  }
}
</script>
<style scoped>
.about {
  height: calc(100% - 60px);
}
iframe {
  height: 50%;
  width: 50%;
}
</style>