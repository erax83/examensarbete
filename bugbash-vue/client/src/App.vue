<template>
  <div id="app">
    <!-- Header bar -->
    <header class="main-header">
      <!-- Logo -->
      <router-link class="logo" to="/">Bug Bash</router-link>
      <div>
        <!-- Avatar is displayed if user is logged in. -->
        <avatar
          v-if="this.signedIn == true"
          class="avatar"
          :username="this.$store.getters.userInitials"
          :src="this.$store.getters.avatarImage"
          :size="25"
        ></avatar>
      </div>
      <!-- Drop down menu -->
      <div class="dropdown">
        <button class="dropbtn"><font-awesome-icon icon="bars" /></button>
        <div class="dropdown-content">
          <router-link to="/">Start Page</router-link>
          <router-link to="/userSignIn">User Sign In</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
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
    /**
     * Check if user is logged in.
     * @return {Boolean} Return Boolean depending on users logg in status.
     */
    signedIn() {
      var check = false;
      if (this.$store.getters.userAuth !== null) {
        check = this.$store.getters.userAuth;
        check = check.isSignedIn();
      }
      return check;
    },
  },
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

.comment-field {
  max-width: 700px;
}

h3 {
  margin: 40px 0 0;
}

header.main-header {
  display: flex;
  align-items: center;
  background: #388af6;
  color: #fff;
  padding: 0.5em 1em;
}

.error-viewer {
  max-width: 1024px;
  align-self: center;
  width: 95%;
}

.detail-viewer {
  max-width: 1024px;
  align-self: center;
  width: 95%;
}

.user-viewer {
  max-width: 1024px;
  align-self: center;
  width: 95%;
}

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
  text-decoration: none;
}

ul {
  padding: 0;
  list-style-type: none;
}

li {
  display: inline-block;
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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

.error-mobile-prefix {
  display: none;
}

table {
  width: 100%;
  border-collapse: collapse;
}

@media only screen and (max-width: 800px) /* (min-device-width: 768px) and (max-device-width: 1024px) */ {
  #app {
    display: block;
  }

  .error-mobile-prefix {
    display: inline;
  }

  .error-viewer {
    margin-left: 10px;
  }

  .detail-viewer {
    margin-left: 10px;
  }

  .user-viewer {
    margin-left: 10px;
  }

  td,
  th {
    padding: 6px;
    text-align: left;
  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tbody tr {
    margin: 5px;
    padding: 12px;
  }
}
</style>
