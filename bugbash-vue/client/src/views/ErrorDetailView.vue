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
    </div>
    <div>
      <div>
        <h3>Comments</h3>
        <ul v-for="(comment, index) in userComments" v-bind:key="index">
          <li>
            {{ comment }}
          </li>
        </ul>
        <ul v-for="(comment, index) in this.userCommentList" v-bind:key="index">
          <li>
            <h4>
              {{ comment.userName }}
            </h4>
          </li>
          <br>
          <li>{{ comment.userComment }}</li>
          <br />
        </ul>
      </div>
      <form v-on:submit="postUserComment">
        <span>Add a comment:</span>
        <br />
        <textarea
          v-model="userComment"
          name="userCommentName"
          placeholder="add your comment"
        ></textarea>
        <br />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import GoogleLogin from "vue-google-login";

export default {
  name: "ErrorDetailView",
  // components: {
  //   GoogleLogin,
  // },
  data: function() {
    return {
      id: this.$route.params.id,
      // hash: this.errorOccurrence[0].hashNumber,
      occurrenceDetails: [],
      selected: "",
      userCommentList: [],
      // userCommentList: this.getUserComments,
      userComment: "",
      // testy: this.userComments(),
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
  },
  // watch: {
  //   userCommentList: function () {

  //   }
  // },
  methods: {
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

            this.userCommentList = responseArray;

            // return responseArray;

            // return response;

            // this.userCommentList = response.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
    // getComments(i) {
    //   return this.userCommentList[i];
    // },
    postUserComment: async function(e) {
      console.log(this.userComment);
      console.log(e);
      var errorHashNumber = await this.occurrenceDetails[0].hashNumber;
      var userInfo = null;
      if (this.$store.getters.userInfo !== null) {
        userInfo = this.$store.getters.userInfo;
      } else {
        return alert("You must be logged in to make a comment");
      }
      console.log("user info: " + userInfo.sd);
      // it prevent from page reload
      e.preventDefault();

      try {
        axios
          .post("http://localhost:3000/errorRouter/userComment", {
            params: {
              queryData: this.userComment,
              hashId: errorHashNumber,
              userName: userInfo.sd,
            },
          })
          .then(async (response) => {
            this.getUserComments();
            const result = await response.data;
            console.log("inside post, post data: " + result);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },

  updated: function() {
    this.getOccurrencesDates();
  },

  mounted() {
    this.getOccurrencesById(this.id);
    // this.getUserComments();
  },
};
</script>

<style>
.detail-view {
  max-width: 1024px;
  align-self: center;
  width: 100%;
}
</style>
