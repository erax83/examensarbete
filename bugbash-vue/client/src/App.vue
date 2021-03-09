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
    <!-- <div v-if="this.userIcon !== null">
      <img :src="userIcon" alt="user icon" />
    </div> -->
    <div>
      <avatar
        v-if="this.signedIn == true"
        :username="`${this.userInitials}`"
        :src="this.$store.getters.avatarImage"
        :size="40"
      ></avatar>
    </div>

    <image-uploader
      :debug="1"
      :maxWidth="512"
      :quality="0.7"
      :autoRotate="true"
      outputFormat="verbose"
      :preview="false"
      :className="['fileinput', { 'fileinput--loaded': hasImage }]"
      capture="environment"
      accept="image/*"
      doNotResize="['gif', 'svg']"
      @input="setImage"
      @onUpload="startImageResize"
      @onComplete="endImageResize"
    >
      <label for="fileInput" slot="upload-label">
        <span class="upload-caption">{{
          hasImage ? "Replace" : "Upload"
        }}</span>
      </label>
    </image-uploader>

    <!-- <div>
      <button @click="print">print</button>
      <div ref="printMe">
        <h1>Print me!</h1>
      </div>
      <img :src="output" />
    </div> -->

    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import GoogleLogin from "vue-google-login";
// Behövs för viss funktionalitet
// import { LoaderPlugin } from 'vue-google-login';

import Avatar from "vue-avatar";
import image from "./assets/logo.png";
// import SimpleUpload from "./components/SimpleUpload.vue";

export default {
  name: "App",
  components: {
    GoogleLogin,
    Avatar,
    // SimpleUpload,
  },
  data: function() {
    return {
      output: null,
      userIcon: null,
      userInitials: null,
      signedIn: false,
      file: "",
      // avatarTest: [],
      testImage: image,
      // selectedFile: null,
      image: "",
      hasImage: false,
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
  //  mounted() {
  //     let recaptchaScript = document.createElement('script')
  //     recaptchaScript.setAttribute('src', 'https://apis.google.com/js/platform.js')
  //     document.head.appendChild(recaptchaScript)
  //   },
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);
      // console.log(JSON.stringify(googleUser));
      const data = googleUser.getBasicProfile();
      console.log("full name: " + data.sd);
      this.userInitials = data.sd;
      this.signedIn = true;
      // const image = googleUser.getBasicProfile().getImageUrl();
      // this.userIcon = image;
      // const test = gapi.auth2.getAuthInstance().isSignedIn.get();
      // console.log(test);
      // console.log(auth2.isSignedIn.get());
    },
    async print() {
      // const el = this.$refs.printMe;
      const el = document.body;

      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL",
      };
      // this.output = await this.$html2canvas(el, options);

      html2canvas(el, options).then(function(canvas) {
        document.body.appendChild(canvas);
      });
    },
    setImage: function(file) {
      this.hasImage = true;
      this.image = file;
      this.$store.commit("changeAvatarImage", file.dataUrl);
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
