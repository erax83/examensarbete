<template>
  <div class="detail-view">
    <h1>{{ error.message }}</h1>
    <button @click="backToErrorList()">Tillbaka</button>
    <h3>ID</h3>
    <p>{{ error._id }}</p>
    <h3>Stacktrace</h3>
    <p>{{ error.stack }}</p>
    <h3>Language</h3>
    <p>{{ error.language }}</p>
    <h3>Plugins</h3>
    <p v-if="error.plugins == true">{{ error.plugins }}</p>
    <h3>Browser Window Width</h3>
    <p>{{ error.browserWindowWidth }}</p>
    <h3>Browser Window Height</h3>
    <p>{{ error.browserWindowHeight }}</p>
  </div>
</template>

<script>
export default {
  name: "ErrorDetail",
  props: {
    error: Object,
  },
  methods: {
    backToErrorList() {
      this.$emit("emitFromErrorDetail");
    },
  },
};
</script>

<style>
.detail-view {
  max-width: 1024px;
  align-self: center;
  width: 100%;
}
</style>
