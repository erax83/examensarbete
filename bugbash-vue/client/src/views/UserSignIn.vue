<template>
  <!-- Component for signing in user. -->
  <div class="user-viewer">
    <!-- SignIn Component. -->
    <h1>Sign in</h1>
    <sign-in class="sign-in"></sign-in>
    <!-- User name and mail. Links to userpage with usercomments. -->
    <span v-if="loggedInOrNot">
      <router-link
        :to="{
          name: 'userById',
          params: { id: userId },
        }"
        ><h3>{{ userName }}</h3></router-link
      >
      <p>{{ userMail }}</p>
      <br />
    </span>
    <hr />
  </div>
</template>

<script>
import SignIn from "../components/SignIn.vue";
// import axios from "axios";

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
     * Checks if user is logged in or not. Returns boolean.
     * @returns {Boolean} 
     */
    // signedIn() {
    //   var check = false;
    //   if (this.$store.getters.userAuth !== null) {
    //     check = this.$store.getters.userAuth.isSignedIn();
    //   }
    //   return check;
    // },
    
    /**
     * Checks if user is logged in. Returns boolean. 
     * @returns {Boolean} 
     */
    loggedInOrNot() {
      if (this.$store.getters.completeGoogleUser !== null) {
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
      return this.$store.getters.completeGoogleUser.getBasicProfile().Te;
    },
    /**
     * Returns users mail if user is logged in.
     * @returns {String} 
     */
    userMail() {
      return this.$store.getters.completeGoogleUser.getBasicProfile().At;
    },
    /**
     * Returns users id if user is logged in. Used to link to UserById view.
     * @returns {String} 
     */
    userId() {
      return this.$store.getters.completeGoogleUser.getBasicProfile().getId();
    },
  },
  methods: {
    // testMethod() {
    //   if (this.$store.getters.userAuth !== null) {
    //     if (this.$store.getters.completeGoogleUser.isSignedIn() == true) {
    //       console.log("true");
    //       console.log(
    //         this.$store.getters.completeGoogleUser.getBasicProfile().Te
    //       );
    //     } else {
    //       console.log("false");
    //     }
    //   } else {
    //     console.log("null");
    //   }
    // },
    // getActivities: async function() {
    //   axios
    //     .get("http://localhost:3000/errorRouter/userActivity")
    //     .then((response) => {
    //       const r = response.data;
    //       console.log(r);
    //       return r;
    //     });
    // },
  },
};
</script>

<style scoped></style>
