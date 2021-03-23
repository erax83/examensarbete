<template>
  <div id="app">
    <header class="main-header">
      <a class="logo">Bugbash</a>
      <div class="global-buttons">
      </div>
      <div>
        <avatar
          v-if="this.signedIn == true"
          class="avatar"
          :username="this.$store.getters.userInitials"
          :src="this.$store.getters.avatarImage"
          :size="38"
        ></avatar>
      </div>

      <menu-wrapper>
        <template slot="menu-button"
          ><font-awesome-icon icon="bars" />
        </template>
        <template slot="menu-content">
          <menu-link><router-link to="/">Start Page</router-link></menu-link>
          <menu-link
            ><router-link to="/user">User Sign In</router-link></menu-link
          >
          <menu-link><router-link to="/about">About</router-link></menu-link>
        </template>
      </menu-wrapper>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import { MenuWrapper, MenuLink } from "vue-menu-button";
// import GoogleLogin from "vue-google-login";

export default {
  name: "App",
  components: {
    Avatar,
    MenuWrapper,
    MenuLink,
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

[data-vue-menu-button] {
  background-color: transparent;
  border: 1px solid #555;
  color: #555;
  cursor: pointer;
  font-size: inherit;
  display: inline-block;
  border-radius: 3px;
  font-weight: 700;
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  text-align: center;
  white-space: nowrap;
}

[data-vue-menu-button]:focus {
  outline: 0;
  color: #236ca4;
  border-color: #236ca4;
  box-shadow: 0 0 3px 2px #236ca4;
}

[data-vue-menu] {
  list-style: none;
  margin: 10px 0 0 0;
  padding: 0;
  width: 220px;
  padding: 10px 0;
  border: 1px solid grey;
  position: relative;
  animation: slide-down 0.2s ease;
}

[data-vue-menu]::before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 7px solid black;
  top: -7px;
  left: 15px;
}

[data-vue-menu]::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid white;
  top: -6px;
  left: 16px;
}

[data-vue-menu-item],
[data-vue-menu-link] {
  color: inherit;
  text-decoration: none;
  line-height: 28px;
  height: 28px;
  cursor: pointer;
  padding: 0 10px;
  display: block;
}

[data-vue-menu-item]:focus,
[data-vue-menu-link]:focus {
  outline: 0;
  background-color: #236ca4;
  color: #fff;
  display: block;
}

[data-vue-menu-item]:hover,
[data-vue-menu-link]:hover {
  outline: 0;
  background-color: #236ca4;
  color: #fff;
  display: block;
}

[tabindex="-1"]:focus,
*::-moz-focus-inner {
  border: 0;
}

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
