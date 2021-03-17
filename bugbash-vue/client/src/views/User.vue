<template>
  <div>
    <h1>User</h1>
    <button>
      <router-link to="/">Back</router-link>
    </button>
    <sign-in></sign-in>
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue";

export default {
  name: "User",
  components: {
    SignIn,
  },
};
</script>

<style></style>
