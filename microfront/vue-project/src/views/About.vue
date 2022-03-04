<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  created() {
    console.log(999);
    setTimeout(() => {
      window.location.href = "https://www.baidu.com/";
    }, 3000);
  },
};
</script>
