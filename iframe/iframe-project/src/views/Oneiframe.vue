<template>
  <div class="about">
  <iframe :src="url" />
  </div>
</template>
<script>
export default {
  props:{
    url: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.about {
  height: calc(100% - 60px);
}
iframe {
  height: 100%;
}
</style>