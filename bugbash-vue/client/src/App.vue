<template>
  <div id="app">
    <header class="main-header">
      <a class="logo">Bugbash</a>
      <div class="global-buttons">
        <button><font-awesome-icon icon="bars" /></button>
      </div>
    </header>
    <GoogleLogin
      :params="params"
      :renderParams="renderParams"
      :onSuccess="onSuccess"
      :onFailure="onFailure"
    ></GoogleLogin>
    <GoogleLogin :params="params" :logoutButton="true" :signOut="signOut"
      >Logout</GoogleLogin
    >
    <div v-if="this.userIcon !== null">
      <img :src="userIcon" alt="user icon" />
    </div>
    <avatar :username="`${this.userInitials}`" :size="30"></avatar>

    <router-view></router-view>
  </div>
</template>

<script>
import GoogleLogin from "vue-google-login";
// Behövs för viss funktionalitet
// import { LoaderPlugin } from 'vue-google-login';

import Avatar from "vue-avatar";

export default {
  name: "App",
  components: {
    GoogleLogin,
    Avatar,
  },
  data: function() {
    return {
      userIcon: null,
      userInitials: null,
      params: {
        client_id:
          "239286565520-4olejvir9qtbmtsbdrn82lakb1gls3qp.apps.googleusercontent.com",
        // client_id: process.env.GOOGLECLIENT_ID,
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);
      // console.log(JSON.stringify(googleUser));
      const data = googleUser.getBasicProfile();
      console.log("full name: " + data.sd);
      this.userInitials = data.sd;
      const image = googleUser.getBasicProfile().getImageUrl();
      this.userIcon = image;
    },
  },
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

/* a {
  color: #42b983;
} */

/* img {
  border: 3px solid black;
  border-radius: 25px;
} */
</style>
