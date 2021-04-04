<template>
  <div id="app">
    <header class="main-header">
      <router-link class="logo" to="/">Bug Bash</router-link>
      <div>
        <avatar
          v-if="this.signedIn == true"
          class="avatar"
          :username="this.$store.getters.userInitials"
          :src="this.$store.getters.avatarImage"
          :size="25"
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
  color: #333;
  line-height: 1.7em;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

header.main-header {
  display: flex;
  align-items: center;
  background: #388af6;
  color: #fff;
  padding: 0.5em 1em;
}

/* header button {
  color: #fff;
  margin: 0;
  padding: 0;
} */

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

/* nav {
  background-color: whitesmoke;
  height: 100px;
  padding: 20px;
} */

hr {
  margin: 10px 5px 15px 5px;
}

button {
  background-color: transparent;
  border: 1px solid #388af6;
  border-radius: 3px;
  padding: 0.5em 1em;
  margin: 0.5em;
  text-align: center;
  text-decoration: none;
}

button:hover {
  background-color: #388af6;
  color: white;
  cursor: pointer;
}

td {
  cursor: pointer;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  margin: 0 10px;
}

/* Bugbash logo */
.logo {
  color: white;
  text-decoration: none;
}

a.logo {
  display: flex;
  flex: 1;
  font-size: 1.4em;
}

/* Avatar */
.avatar {
  margin-right: 2.7em;
}

/* Menubutton */
.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  color: white;
  padding: 1em;
  font-size: 1em;
  border: none;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #388af6;
  color: white;
  text-decoration: none;
  right: 0;
  min-width: 160px;
  z-index: 1;
}

.dropdown-content a {
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #529dff;
}

.dropdown-content a:visited {
  color: white;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
