<template>
  <div class="sign-in">
    <div>
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
        <div>
          <!-- <button @click="removeUserImage">Remove userimage</button> -->
          <font-awesome-icon
            @click="removeUserImage"
            icon="trash-alt"
          ></font-awesome-icon>
          <!-- <p>|</p> -->
          <button>Accept</button>
        </div>
      </div>
    </div>
    <div>
      <avatar
        class="avatar"
        :click="showImageUploader"
        v-if="this.signedIn == true"
        :username="this.$store.getters.userInitials"
        :src="this.$store.getters.avatarImage"
        :size="38"
      ></avatar>
    </div>
    <div>
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
      <GoogleLogin
        :params="params"
        :logoutButton="true"
        :onFailure="onFailure"
        :signOut="signOut"
        >Logout</GoogleLogin
      >
      <button @click="testMethod">Test</button>
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
      userInitials: this.$store.getters.userInitials,
      // signedIn: this.$store.getters.signedIn,
      // signedIn: this.$store.getters.userAuth.isSignedIn(),

      // user: null,
      file: "",
      signedInUser: null,
      // avatarTest: [],
      // testImage: image,
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
        width: 180,
        height: 30,
        longtitle: true,
      },
    };
  },
  computed: {
    signedIn() {
      var check = false;
      if(this.$store.getters.userAuth !== null) {
        check = this.$store.getters.userAuth.isSignedIn()
      } 
      return check;
    }
  },
  methods: {
    testMethod() {
      if(this.$store.getters.userAuth !== null) { 
        if(this.$store.getters.userAuth.isSignedIn()) {
          console.log('true');
        }
        else {
          console.log('false');
        }
      }
      else {
        console.log('null');
      }
    },
    onSuccess(googleUser) {
      console.log(googleUser);
      // console.log(JSON.stringify(googleUser));
      const userData = googleUser.getBasicProfile();
      this.$store.commit("changeUserInfo", userData);
      console.log("full name: " + userData.sd);
      this.signedInUser = googleUser;
      // this.userInitials = userData.sd;
      this.$store.commit("changeUserInitials", userData.sd);
      this.$store.commit("changeSignedIn", true);
      // const image = googleUser.getBasicProfile().getImageUrl();
      // this.userIcon = image;
      // const test = gapi.auth2.getAuthInstance().isSignedIn.get();
      // console.log(test);
      // console.log(auth2.isSignedIn.get());
      this.$store.commit("changeUserAuth", googleUser);
      console.log("testing: " + googleUser.isSignedIn());
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
    },
  },
};
</script>

<style>
.sign-in {
  display: flex;
  align-items: center;
  padding: 0.3em 1.9em;
  margin-right: 1.6em;
}

/* .avatar {
  margin-right: 2.7em;
} */
</style>
