<template>
  <div class="user-viewer">
    <h1>User</h1>
    <button>
      <router-link to="/">Back</router-link>
    </button>
    <sign-in class="sign-in"></sign-in>
    <div>
      <p>{{loggedInOrNot}}</p>
    </div>
    
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue";

export default {
  name: "User",
  components: {
    SignIn,
  },
  data: function() {
    return {
      // active: this.loggedInOrNot(),
    };
  },
  computed: {
    loggedInOrNot() {
      return this.$store.getters.completeGoogleUser.isSignedIn();
    },
  }
};
</script>

<style>
.sign-in {
  margin: 2em;
}
</style>
