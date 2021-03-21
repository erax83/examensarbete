<template>
  <div id="app">
    <header class="main-header">
      <a class="logo">Bugbash</a>
      <!-- <sign-in></sign-in> -->
      <div class="global-buttons">
        <button><font-awesome-icon icon="bars" /></button>
      </div>
      <router-link
        :to="{
          name: 'user',
        }"
        ><p>User Login</p></router-link
      >
      <div>
        <avatar
          v-if="this.signedIn == true"
          class="avatar"
          :username="this.$store.getters.userInitials"
          :src="this.$store.getters.avatarImage"
          :size="38"
        ></avatar>
      </div>
      <drop-down
        ><div class="global-buttons">
          <button><font-awesome-icon icon="bars" /></button></div
      ></drop-down>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import DropDown from "./components/DropDown.vue";
// import GoogleLogin from "vue-google-login";

export default {
  name: "App",
  components: {
    // GoogleLogin,
    Avatar,
    DropDown,
  },
  data: function() {
    return {
      userInitials: this.$store.getters.userInitials,
    };
  },
  computed: {
    signedIn() {
      var check = false;
      if (this.$store.getters.userAuth !== null) {
        check = this.$store.getters.userAuth.isSignedIn();
      }
      return check;
    },
  },
  // beforeCreate() {
  // 	this.$store.commit('initialiseStore');
  // },
  methods: {},
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: hsl(210, 29%, 24%);
}

header.main-header {
  display: flex;
  align-items: center;
  background: #388af6;
  color: #fff;
  padding: 0.5em 1em;
}

header button {
  color: #fff;
  margin: 0;
  padding: 0;
}

.error-viewer {
  max-width: 1024px;
  align-self: center;
  width: 100%;
}

.user-viewer {
  max-width: 1024px;
  align-self: center;
  width: 100%;
}

.logo {
  color: white;
}

a.logo {
  display: flex;
  flex: 1;
  font-size: 1.4em;
}

nav {
  background-color: whitesmoke;
  height: 100px;
  padding: 20px;
}

button {
  background-color: transparent;
  border: 1px solid #388af6;
  border-radius: 3px;
  color: #333;
  padding: 0.5em 1em;
  margin: 0 0.5em 0 0;
  text-align: center;
  text-decoration: none;
}

button:hover {
  background-color: #388af6;
  color: white;
  cursor: pointer;
}

h3 {
  margin: 40px 0 0;
}

td {
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.avatar {
  margin-right: 2.7em;
}

/* a {
  color: #42b983;
} */

/* img {
  border: 3px solid black;
  border-radius: 25px;
} */
</style>
