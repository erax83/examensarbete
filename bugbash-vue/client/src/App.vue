<template>
  <div id="app">
    <header class="main-header">
      <router-link class="logo" to="/">Bug Bash</router-link>
      <!-- <div class="global-buttons"></div> -->
      <div>
        <avatar
          v-if="this.signedIn == true"
          class="avatar"
          :username="this.$store.getters.userInitials"
          :src="this.$store.getters.avatarImage"
          :size="38"
        ></avatar>
      </div>

      <div class="dropdown">
        <button class="dropbtn"><font-awesome-icon icon="bars" /></button>
        <div class="dropdown-content">
          <router-link to="/">Start Page</router-link>
          <router-link to="/user">User Sign In</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
// import GoogleLogin from "vue-google-login";

export default {
  name: "App",
  components: {
    Avatar,
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
        // console.log('signedIn: ' + this.$store.getters.userAuth.isSignedIn());
        check = this.$store.getters.userAuth;
        check = check.isSignedIn();
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
  text-decoration: none;
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

.menu-button {
  background: #333;
}

.dropbtn {
  /* background-color: #4caf50; */
  color: white;
  padding: 1em;
  font-size: 1em;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  right: 0;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: rgb(229, 233, 240);
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
