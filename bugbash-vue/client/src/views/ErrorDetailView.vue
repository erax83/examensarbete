<template>
  <div class="detail-view">
    <h1>{{ this.errorOccurrence[0].message }}</h1>
    <button>
      <router-link to="/">Back</router-link>
    </button>
    <!-- <button @click="getOccurrencesDates()">Uppdatera</button> -->
    <h3>Earlier occurrences</h3>
    <select v-model="selected" @change="onSelectChange()">
      <option value="" disabled>{{
        new Date(
          this.$store.getters.errors.slice().reverse()[0].timeStamp
        ).toLocaleString()
      }}</option>

      <option
        v-for="(option, index) in this.$store.getters.errors.slice().reverse()"
        v-bind:key="index"
        :value="option._id"
      >
        {{ new Date(option.timeStamp).toLocaleString() }}
      </option>
    </select>

    <div>
      <h3>Date</h3>
      <p>
        {{ new Date(this.errorOccurrence[0].timeStamp).toLocaleString() }}
      </p>
      <h3>ID</h3>
      <p>{{ this.errorOccurrence[0]._id }}</p>
      <h3>Stacktrace</h3>
      <p>{{ this.errorOccurrence[0].stack }}</p>
      <h3>Language</h3>
      <p>{{ this.errorOccurrence[0].language }}</p>
      <h3>Plugins</h3>
      <p v-if="this.errorOccurrence[0].plugins == true">
        {{ this.errorOccurrence[0].plugins }}
      </p>
      <h3>Browser Window Width</h3>
      <p>{{ this.errorOccurrence[0].browserWindowWidth }}</p>
      <h3>Browser Window Height</h3>
      <p>{{ this.errorOccurrence[0].browserWindowHeight }}</p>
      <h3>Screen</h3>
      <simple-modal v-model="isShow" @click="isShow = !isShow">
        <template slot="body">
          <h2>Screen</h2>
          <img
            id="canvasScreen"
            :src="this.errorOccurrence[0].canvas"
            alt="canvas"
          />
        </template>
      </simple-modal>
      <button @click="isShow = !isShow">
        <img
          id="canvasScreen"
          :src="this.errorOccurrence[0].canvas"
          alt="canvas"
        />
      </button>
    </div>
    <div>
      <div>
        <h3>Issues</h3>
        <form v-on:submit="openNewIssue()">
          <span><h4>Add new issue in Github:</h4></span>
          <br />
          <input
            v-model="issueHeadline.x"
            type="text"
            placeholder="add issue headline"
          />
          <br />
          <button type="submit">Add Issue</button>
        </form>
      </div>

      <form v-on:submit="postUserComment">
        <span><h3>Add a comment:</h3></span>
        <br />
        <textarea
          v-model="userComment"
          name="userCommentName"
          placeholder="add your comment"
        ></textarea>
        <br />
        <button type="submit">Add Comment</button>
      </form>
      <div>
        <h3>Comments</h3>
        <ul v-for="(comment, index) in userComments" v-bind:key="index">
          <li>
            {{ comment }}
          </li>
        </ul>
        <ul v-for="(comment, index) in this.userCommentList" v-bind:key="index">
          <li>
            <router-link
              :to="{
                name: 'userById',
                // params: { id: error.occurrenceDetails[0]._id },
              }"
              ><h4>{{ comment.userName }}</h4></router-link
            >
          </li>
          <br />
          <li>{{ comment.userComment }}</li>
          <br />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SimpleModal from "simple-modal-vue";
// import GoogleLogin from "vue-google-login";

export default {
  name: "ErrorDetailView",
  components: {
    SimpleModal,
  },
  data: function() {
    return {
      id: this.$route.params.id,
      occurrenceDetails: [],
      selected: "",
      userCommentList: [],
      // userCommentList: this.getUserComments,
      userComment: "",
      issueHeadline: {
        x: "",
        y: "",
      },
      // testId: this.errorOccurrence[0]._id,
      // isLoggedIn: this.$store.getters.userAuth.isSignedIn(),
      // testy: this.userComments(),
      // canvasUrl: this.errorOccurrence[0].browserWindowHeight,
      isShow: false,
    };
  },
  computed: {
    errorOccurrence() {
      return this.occurrenceDetails;
    },
    userComments: function() {
      return this.getUserComments();
      // return this.userCommentList;
    },
    isLoggedIn() {
      if (
        this.$store.getters.userAuth == null ||
        this.$store.getters.userAuth.isSignedIn() == false
      ) {
        return null;
      } else {
        return true;
      }
    },
    paramData() {
      // const userInfo = this.errorOccurrence[0]._id;
      const userInfo =
        `Error occurrence: Date: ${new Date(
          this.errorOccurrence[0].timeStamp
        ).toLocaleString()} ` +
        `ID: ${this.errorOccurrence[0]._id} ` +
        // `Stacktrace: ${this.errorOccurrence[0].stack} ` +
        `Language: ${this.errorOccurrence[0].language} ` +
        `Browser Window Width: ${this.errorOccurrence[0].browserWindowWidth} ` +
        `Browser Window Height: ${this.errorOccurrence[0].browserWindowHeight} `;
      return userInfo;
    },
  },
  // watch: {
  //   userCommentList: function () {

  //   }
  // },
  methods: {
    show() {
      this.$modal.show("my-first-modal");
    },
    hide() {
      this.$modal.hide("my-first-modal");
    },
    onSelectChange: async function() {
      this.id = await this.selected;
      this.getOccurrencesById(this.id);
      this.$router.replace({ name: "errorInfo", params: { id: this.id } });
    },
    getOccurrencesDates: async function() {
      var errorHashNumber = await this.occurrenceDetails[0].hashNumber;
      axios
        .get("http://localhost:3000/errorRouter/occurrencesByHash", {
          params: { queryData: errorHashNumber },
        })
        .then((response) => this.$store.commit("changeErrors", response.data));
    },
    getOccurrencesById: function(id) {
      try {
        axios
          .get("http://localhost:3000/errorRouter/occurrencesById", {
            params: { queryData: id },
          })
          .then((response) => {
            this.occurrenceDetails = response.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
    getUserComments: async function() {
      console.log("inside get comments");
      var hashId = await this.occurrenceDetails[0].hashNumber;
      console.log("hash: " + hashId);
      // const userData = googleUser.getBasicProfile();
      // console.log('user data: ' + userData.sd);
      // e.preventDefault();
      try {
        return axios
          .get("http://localhost:3000/errorRouter/userComments", {
            params: { queryData: hashId },
          })
          .then((response) => {
            var responseArray = [];
            responseArray = response.data;
            // console.log("response data: " + responseArray[1]);

            this.userCommentList = responseArray.reverse();

            // return responseArray;

            // return response;

            // this.userCommentList = response.data;
          });
      } catch (err) {
        console.log(err);
      }
    },

    postUserComment: async function() {
      console.log(this.userComment);
      // console.log(e);
      var errorHashNumber = await this.occurrenceDetails[0].hashNumber;
      var userInfo = null;

      if (this.isLoggedIn == null) {
        return alert("Null: You must be logged in to make a comment");
      } else {
        userInfo = this.$store.getters.userInfo;

        console.log("user info: " + userInfo.Te);
        // it prevent from page reload
        // e.preventDefault();

        try {
          axios
            .post("http://localhost:3000/errorRouter/userComment", {
              params: {
                queryData: this.userComment,
                hashId: errorHashNumber,
                userName: userInfo.Te,
              },
            })
            .then(async (response) => {
              const result = await response.data;
              console.log("inside post, post data: " + result);
            });
        } catch (err) {
          console.log(err);
        }
      }
    },
    openNewIssue: async function() {
      // this.issueHeadline.y = await this.occurrenceDetails[0].stack;
      // const issueData = await `hello ${this.occurrenceDetails[0].stack} helo hello`;
      // debugger;
      // console.log('headline: ' + await issueData);
      // debugger;
      await window.open(
        `https://github.com/bryntum/bugbash/issues/new?title=${this.issueHeadline.x}&body=${this.paramData}`
      );
    },
  },

  updated: function() {
    this.getOccurrencesDates();
  },

  mounted() {
    this.getOccurrencesById(this.id);
  },
};
</script>

<style>
.detail-view {
  max-width: 1024px;
  align-self: center;
  width: 100%;
}

#canvasScreen {
  width: 500px;
  /* height: 1em; */
}
</style>
