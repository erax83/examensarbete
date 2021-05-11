<template>
  <div class="sign-in">
    <div>
      <!-- Google Login -->
      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
      <GoogleLogin
        v-if="signedIn == true"
        :params="params"
        :logoutButton="true"
        :onFailure="onFailure"
        :signOut="signOut"
        >Logout</GoogleLogin
      >
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
     <!-- <div v-if="signedIn == true">
      <avatar
        class="avatar"
        :click="showImageUploader"
        :username="this.$store.getters.userInitials"
        :src="this.$store.getters.avatarImage"
        :size="25"
      ></avatar>
    </div>  -->
    
  </div>
</template>

<script>
import axios from "axios";
// import Avatar from "vue-avatar";
import GoogleLogin from "vue-google-login";
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
    /**
     * Checks if user is logged in. Returns boolean.
     * @returns {Boolean} 
     */
    signedIn() {
      var check = false;
      if (this.$store.getters.userAuth !== null) {
        check = this.$store.getters.userAuth.isSignedIn();
      }
      return check;
    },
  },
  methods: {
    /**
     * Method called if Google sign in succeeds. 
     * @param {Object} googleUser User object from Google.
     */
    onSuccess: async function(googleUser) {
      let userExists = null;
      let userData = await googleUser.getBasicProfile();
      console.log('userData: ' + JSON.stringify(userData));
      let currentName = await userData.Ue;
      let currentMail = await userData.Rt;
      let currentId = await userData.getId();
      await axios
        .get("http://localhost:3000/errorRouter/userCheck", {
          params: { queryData: currentMail, },
        })
        .then(async (response) => {
          userExists = await response.data;
        });

      /**
       * Create new user in database if user doeas not yet exist.
       */
      if ((await userExists) == true) {
        console.log("User already exists");
      } else {
        await this.postNewUser(currentName, currentMail, currentId);
      }

      this.$store.commit("changeUserInfo", googleUser.getBasicProfile());
      this.$store.commit("changeCompleteGoogleUser", googleUser);
      this.signedInUser = googleUser;
      this.$store.commit("changeUserInitials", userData.Ue);
      this.$store.commit("changeSignedIn", true);
      this.$store.commit("changeUserAuth", googleUser);
      console.log("testing: " + googleUser.isSignedIn());
    },
    /**
     * Register new user in the database.
     * @param {String} newName Name from Google.
     * @param {String} newMail Mailaddress from Google.
     * @param {String} newId Id from Google.
     */
    postNewUser: async function(newName, newMail, newId) {
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
    // setImage: function(file) {
    //   this.hasImage = true;
    //   this.$store.commit("changeAvatarImage", file.dataUrl);
    // },
    // removeUserImage() {
    //   this.$store.commit("changeAvatarImage", "");
    // },
    // showImageUploader() {
    //   this.imageUploaderDisplay = true;
    // },
    // hideImageUploader() {
    //   this.imageUploaderDisplay = false;
    // },
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
</style>
