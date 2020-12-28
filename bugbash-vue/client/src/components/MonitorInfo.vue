<template>
  <div>
    <h1>More info</h1>
    <button @click="backToLogger()">Tillbaka</button>
    <p>{{ new Date(error.timeStamp * 1000) }}</p>
    <p>{{ error.message }}</p>
    <p>{{ error.session.url }}</p>
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
