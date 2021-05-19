<template>
  <!-- Component for signing in user. -->
  <div class="user-viewer">
    <!-- SignIn Component. -->
    <h1>Sign in</h1>
    <sign-in class="sign-in"></sign-in>
    <!-- User name and mail. Links to userpage with usercomments. -->
    <div v-if="loggedInOrNot">
      <router-link
        :to="{
          name: 'userById',
          params: { id: userId },
        }"
        ><h3>{{ userName }}</h3></router-link
      >
      <p>{{ userMail }}</p>
      <br />
    </div>
    <hr />
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue";

export default {
  name: "userSignIn",
  components: {
    SignIn,
  },
  data: function() {
    return {
      errors: null,
    };
  },
  computed: {
    /**
     * Checks if user is logged in. Returns boolean.
     * @returns {Boolean}
     */
    loggedInOrNot() {
      if (this.$store.getters.completeGoogleUser !== null) {
        console.log("true");
        return this.$store.getters.completeGoogleUser.isSignedIn();
      } else {
        return false;
      }
    },
    /**
     * Returns username if user is logged in.
     * @returns {String}
     */
    userName() {
      return this.$store.getters.completeGoogleUser.getBasicProfile().Ve;
    },
    /**
     * Returns users mail if user is logged in.
     * @returns {String}
     */
    userMail() {
      return this.$store.getters.completeGoogleUser.getBasicProfile().pu;
    },
    /**
     * Returns users id if user is logged in. Used to link to UserById view.
     * @returns {String}
     */
    userId() {
      return this.$store.getters.completeGoogleUser.getBasicProfile().getId();
    },
  },
  methods: {},
};
</script>

<style scoped></style>
