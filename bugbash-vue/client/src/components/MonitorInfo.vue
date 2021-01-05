<template>
  <div>
    <h1>{{ error.message }}</h1>
    <button @click="backToLogger()">Tillbaka</button>
    <h3>ID</h3>
    <p>{{ error._id }}</p>
    <h3>Stacktrace</h3>
    <p>{{ error.stack }}</p>
    <h3>Language</h3>
    <p>{{ error.language }}</p>
    <h3>Plugins</h3>
    <p>{{ error.plugins }}</p>
  </div>
</template>

<script>
export default {
  name: "MonitorInfo",
  props: {
    error: Object,
  },
  methods: {
    backToLogger() {
      this.$emit("emitFromInfo");
    },
  },
};
</script>

<style></style>
