<template>
  <div>
    <div>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
      <GoogleLogin :params="params" :logoutButton="true" :signOut="signOut"
        >Logout</GoogleLogin
      >
    </div>

    <div>
      <avatar
        :click="showImageUploader"
        v-if="this.signedIn == true"
        :username="`${this.userInitials}`"
        :src="this.$store.getters.avatarImage"
        :size="40"
      ></avatar>
    </div>

    <div>
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
        <!-- <label for="fileInput" slot="upload-label">
          <span class="upload-caption">{{
            hasImage ? "Replace" : "Upload"
          }}</span>
        </label> -->
      </image-uploader>
      <button @click="removeUserImage">Remove userimage</button>
    </div>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
import GoogleLogin from "vue-google-login";
// Behövs för viss funktionalitet
// import { LoaderPlugin } from 'vue-google-login';
export default {
  name: "SignIn",
  components: {
    GoogleLogin,
    Avatar,
  },
  data: function() {
    return {
      output: null,
      userIcon: null,
      userInitials: null,
      signedIn: false,
      file: "",
      signedInUser: null,
      // avatarTest: [],
    //   testImage: image,
      // selectedFile: null,
      imageUploaderDisplay: false,
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
  methods: {
      onSuccess(googleUser) {
      console.log(googleUser);
      // console.log(JSON.stringify(googleUser));
      const userData = googleUser.getBasicProfile();
      console.log("full name: " + userData.sd);
      this.signedInUser = googleUser;
      this.userInitials = userData.sd;
      this.signedIn = true;
      // const image = googleUser.getBasicProfile().getImageUrl();
      // this.userIcon = image;
      // const test = gapi.auth2.getAuthInstance().isSignedIn.get();
      // console.log(test);
      // console.log(auth2.isSignedIn.get());
    },
    setImage: function(file) {
      this.hasImage = true;
    //   this.image = file;
      this.$store.commit("changeAvatarImage", file.dataUrl);
    },
    removeUserImage() {
      this.$store.commit("changeAvatarImage", "");
    },
    showImageUploader() {
      this.imageUploaderDisplay = true;
    },
    hideImageUploader() {
      this.imageUploaderDisplay = false;
    }
  },
};
</script>

<style></style>
