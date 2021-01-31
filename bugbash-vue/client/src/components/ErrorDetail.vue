<template>
  <div class="detail-view">
    <h1>{{ error.inventory[0].message }}</h1>
    <button @click="backToErrorList()">Tillbaka</button>
    <h3>ID</h3>
    <p>{{ error.inventory[0]._id }}</p>
    <h3>Stacktrace</h3>
    <p>{{ error.inventory[0].stack }}</p>
    <h3>Language</h3>
    <p>{{ error.inventory[0].language }}</p>
    <h3>Plugins</h3>
    <p v-if="error.plugins == true">{{ error.inventory[0].plugins }}</p>
    <h3>Browser Window Width</h3>
    <p>{{ error.inventory[0].browserWindowWidth }}</p>
    <h3>Browser Window Height</h3>
    <p>{{ error.inventory[0].browserWindowHeight }}</p>
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
