<template>
  <div class="user-viewer">
    <h1>User</h1>
    <button>
      <router-link to="/">Back</router-link>
    </button>
    <sign-in class="sign-in"></sign-in>
    <button @click="testMethod">Test</button>
    <div v-if="loggedInOrNot == true">
      <h3>{{ userName }}</h3>
      <h3>{{ userMail }}</h3>
    </div>
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue";
import axios from "axios";

export default {
  name: "User",
  components: {
    SignIn,
  },
  data: function() {
    return {};
  },
  computed: {
    loggedInOrNot() {
      if (this.$store.getters.completeGoogleUser !== null) {
        return this.$store.getters.completeGoogleUser.isSignedIn();
      } else {
        return false;
      }
    },
    userName() {
      return this.$store.getters.completeGoogleUser.getBasicProfile().Te;
    },
    userMail() {
      return this.$store.getters.completeGoogleUser.getBasicProfile().At;
    },
  },
  methods: {
    testMethod() {
      if (this.$store.getters.userAuth !== null) {
        if (this.$store.getters.completeGoogleUser.isSignedIn() == true) {
          console.log("true");
          console.log(
            this.$store.getters.completeGoogleUser.getBasicProfile().getId() 
            
            // JSON.stringify(this.$store.getters.completeGoogleUser)
          );
        } else {
          console.log("false");
        }
      } else {
        console.log("null");
      }
    },
    getActivities: async function() {
      axios
        .get("http://localhost:3000/errorRouter/userActivity")
        .then((response) => {
          const r = response.data;
          console.log(r);
          return r;
        });
    },
  },
};
</script>

<style>
/* .sign-in {
  margin: 2em;
} */
</style>