<template>
  <!-- Page displaying a chosen occurrence of a chosen error. The latest occurrence is default. -->
  <div class="detail-view">
    <!-- Error message as header. -->
    <div v-if="this.message !== null">
      <h1>{{ this.message }}</h1>
    </div>
    <!-- Button linking back to error list. -->
    <router-link to="/"><button>Error list</button></router-link>
    <h3>Earlier occurrences</h3>
    <!-- Choose any of the existing occurrences from the current error. -->
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
    <hr />
    <!-- Detailed information of current occurrence. -->
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
      <!-- Screenshot from when error occured. Can be viewed larger when clicked.  -->
      <simple-modal v-model="showBoolean" @click="showBoolean = !showBoolean">
        <template slot="body">
          <h2>Screen</h2>
          <img
            class="canvas-screen-modal"
            :src="this.errorOccurrence[0].canvas"
            alt="canvas"
          />
        </template>
      </simple-modal>
      <button @click="showBoolean = !showBoolean">
        <img
          class="canvas-screen-button"
          :src="this.errorOccurrence[0].canvas"
          alt="canvas"
        />
      </button>
    </div>
    <div>
      <div>
        <!-- Direct link to new issue in github. Errorinfo is added to the issue. -->
        <form v-on:submit="openNewIssue()">
          <h3>Add new issue to Github</h3>
          <input
            v-model="issueHeadline"
            type="text"
            placeholder="Issue headline"
          />
          <br />
          <button type="submit">Post Issue</button>
        </form>
      </div>
      <!-- Post a comment about the error. The comment can be viewed from any selected occurrence of the same error. -->
      <form v-on:submit="postUserComment">
        <span><h3>Add a comment</h3></span>
        <textarea
          class="commentTextArea"
          v-model="userComment"
          name="userCommentName"
          placeholder="Add your comment"
        ></textarea>
        <br />
        <button type="submit">Post Comment</button>
        <ul v-for="(comment, index) in userComments" v-bind:key="index">
          <li>
            {{ comment }}
          </li>
        </ul>
      </form>
    </div>
    <div>
      <!-- Earlier comments are displayed here. -->
      <h3>Comments</h3>
      <ul v-for="(comment, index) in this.userCommentList" v-bind:key="index">
        <li class="list-item">
          <router-link
            :to="{
              name: 'userById',
              params: { id: comment.userId },
            }"
            ><h4>{{ comment.userName }}</h4></router-link
          >
        </li>
        <li class="comment-field">
          <p>{{ comment.userComment }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SimpleModal from "simple-modal-vue";

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
      userComment: "",
      issueHeadline: "",
      message: null,
      showBoolean: false,
    };
  },
  /**
   * Calls method to get all occurrences from the same error.
   */
  mounted() {
    this.getOccurrencesById(this.id);
  },
  updated: function() {
    this.getOccurrencesDates();
  },
  computed: {
    /**
     * Returns
     */
    errorOccurrence() {
      return this.occurrenceDetails;
    },
    userComments: function() {
      return this.getUserComments();
    },
    /**
     * Returns boolean value based on if user is logged in or not.
     */
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
      const occurrenceInfo =
        `Error occurrence: \n` +
        `  Message: ${this.message} \n` +
        `  Date: ${new Date(
          this.errorOccurrence[0].timeStamp
        ).toLocaleString()} \n` +
        `  ID: ${this.errorOccurrence[0]._id} \n` +
        // `Stacktrace: ${this.errorOccurrence[0].stack} ` +
        `  Language: ${this.errorOccurrence[0].language} \n` +
        `  Browser Window Width: ${this.errorOccurrence[0].browserWindowWidth} \n` +
        `  Browser Window Height: ${this.errorOccurrence[0].browserWindowHeight} \n`;

      return occurrenceInfo;
    },
  },
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
    /**
     * Gets all occurrences from the same error type. 
     * @param {ObjectId} id ObjectId in database.
     */
    getOccurrencesById: function(id) {
      try {
        axios
          .get("http://localhost:3000/errorRouter/occurrencesById", {
            params: { queryData: id },
          })
          .then((response) => {
            this.occurrenceDetails = response.data;
            this.getMessageByOccurrenceHash();
          });
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Gets all messages of error from hashnumber. 
     */
    getMessageByOccurrenceHash: function() {
      try {
        axios
          .get("http://localhost:3000/errorRouter/messageByOccurrenceHash", {
            params: { queryData: this.occurrenceDetails[0].hashNumber },
          })
          .then((response) => {
            this.message = response.data;
          });
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Gets comments connected to current error. 
     */
    getUserComments: async function() {
      var hashId = await this.occurrenceDetails[0].hashNumber;
      try {
        return axios
          .get("http://localhost:3000/errorRouter/userComments", {
            params: { queryData: hashId },
          })
          .then((response) => {
            var responseArray = [];
            responseArray = response.data;
            this.userCommentList = responseArray.reverse();
          });
      } catch (err) {
        console.log(err);
      }
    },
    /**
     * Post comment from user input.
     */
    postUserComment: async function(e) {
      e.preventDefault();
      console.log(this.userComment);
      var errorHashNumber = await this.occurrenceDetails[0].hashNumber;
      var userInfo = null;
      var userInfoId = null;
      if (this.isLoggedIn == null) {
        return alert("Null: You must be logged in to make a comment");
      } else {
        userInfo = this.$store.getters.userInfo;
        userInfoId = userInfo.getId();
        try {
          axios
            .post("http://localhost:3000/errorRouter/userComment", {
              params: {
                queryData: this.userComment,
                hashId: errorHashNumber,
                userName: userInfo.Ue,
                userId: userInfoId,
              },
            })
            .then(async (response) => {
              const result = await response.data;
              console.log("inside post, post data: " + result);
            });
            this.getUserComments();
            // e.preventDefault();
            this.$router.push(window.location.pathname); 
        } catch (err) {
          console.log(err);
        }
      }
    },
    /**
     * Opens link to new issue in Github toggether with occurrence info and header from user input.
     */
    openNewIssue: async function() {
      await window.open(
        `https://github.com/bryntum/bugbash/issues/new?title=${encodeURIComponent(this.issueHeadline)}&body=${encodeURIComponent(this.paramData)}`
      );
    },
  },
};
</script>

<style scoped>
.canvas-screen-button {
  width: 25em;
  padding: 1em;
}

.canvas-screen-modal {
  width: 50em;
}

.commentTextArea {
  width: 30em;
  height: 10em;
}

.list-item {
  display: inline;
}
</style>
