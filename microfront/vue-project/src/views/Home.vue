<template>
  <div class="home">
    <form>
      <textarea></textarea>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  mounted() {
    const form = document.querySelector("form");
    const textarea = document.querySelector("textarea");

    const eventAwesome = new CustomEvent("awesome", {
      bubbles: true,
      detail: { text: () => textarea.value },
    });
    form.addEventListener("awesome", (e) => console.log(e.detail.text()));
    textarea.addEventListener("input", (e) =>
      e.target.dispatchEvent(eventAwesome)
    );
  },
};
</script>
