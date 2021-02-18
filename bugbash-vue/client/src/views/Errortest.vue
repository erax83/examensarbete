<template>
  <div id="errortest">
    <router-link to="/errorstest">Back to list</router-link>
    <div v-if="err">
      <p>ID</p>
      <p>{{ err._id }}</p>
      <p>Hashnumber</p>
      <p>{{ err.hashNumber }}</p>
    </div>
    <!-- <p>{{ $route.params.id }}</p>
    <hr /> -->
  </div>
</template>

<script>
export default {
  computed: {
    err() {
      return this.$store.getters.errorTest(this.$route.params.id);
    },
  },
};
</script>

<style></style>
