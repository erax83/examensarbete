<template>
  <div class="sign-in">
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
      <!-- <button @click="testMethod">Test</button> -->
    </div>
    <!-- <div>
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
        </image-uploader>
        <div>
          <button @click="removeUserImage">Remove userimage</button>
          <font-awesome-icon
            @click="removeUserImage"
            icon="trash-alt"
          ></font-awesome-icon>
          <button>Accept</button>
        </div>
      </div>
    </div> -->
    <!-- <div>
      
      <avatar
        class="avatar"
        :click="showImageUploader"
        v-if="this.signedIn == true"
        :username="this.$store.getters.userInitials"
        :src="this.$store.getters.avatarImage"
        :size="25"
      ></avatar>
    </div> -->
    
  </div>
</template>

<script>
import axios from "axios";
// import Avatar from "vue-avatar";
import GoogleLogin from "vue-google-login";
// Behövs för viss funktionalitet
// import { LoaderPlugin } from 'vue-google-login';
export default {
  name: "SignIn",
  components: {
    GoogleLogin,
    // Avatar,
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
        client_id: process.env.VUE_APP_GOOGLECLIENT_ID,
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
      if (this.$store.getters.userAuth !== null) {
        check = this.$store.getters.userAuth.isSignedIn();
      }
      return check;
    },
  },
  methods: {
    testMethod() {
      if (this.$store.getters.userAuth !== null) {
        if (this.$store.getters.userAuth.isSignedIn() == true) {
          console.log("true");
        } else {
          console.log("false");
        }
      } else {
        console.log("null");
      }
    },
    onSuccess: async function(googleUser) {
      let userExists = null;
      let userData = await googleUser.getBasicProfile();

      let currentName = await userData.Te;
      let currentMail = await userData.At;
      let currentId = await userData.getId();
      await axios
        .get("http://localhost:3000/errorRouter/userCheck", {
          params: { queryData: currentMail, },
        })
        .then(async (response) => {
          userExists = await response.data;
        });

      if ((await userExists) == true) {
        console.log("User already exists");
      } else {
        await this.postNewUser(currentName, currentMail, currentId);
      }

      this.$store.commit("changeUserInfo", googleUser.getBasicProfile());
      this.$store.commit("changeCompleteGoogleUser", googleUser);
      this.signedInUser = googleUser;
      this.$store.commit("changeUserInitials", userData.Te);
      this.$store.commit("changeSignedIn", true);
      // const image = googleUser.getBasicProfile().getImageUrl();
      // this.userIcon = image;
      // console.log(test);
      this.$store.commit("changeUserAuth", googleUser);
      console.log("testing: " + googleUser.isSignedIn());
    },
    postNewUser: async function(newName, newMail, newId) {
      console.log("postNewUser: " + newName + " " + newMail + " " + newId);
      try {
        await axios
          .post("http://localhost:3000/errorRouter/user", {
            fullName: newName,
            mail: newMail,
            id: newId,
          })
          .then(async (response) => {
            const result = await response.data;
            console.log("response: " + result);
          });
      } catch (err) {
        console.log("error: " + err);
      }
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
