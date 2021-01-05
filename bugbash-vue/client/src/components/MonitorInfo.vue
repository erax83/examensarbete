<template>
  <div>
    <h1>{{ error.message }}</h1>
    <button @click="backToLogger()">Tillbaka</button>
    <h2>Stacktrace</h2>
    <p>{{ error.stack }}</p>
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
