<template>
  <!-- Component showing user with mailaddress and comments. -->
  <div class="user-viewer">
    <div><h1>User</h1></div>
    <!-- Name and mail -->
    <div v-if="this.currentUser !== null">
      <h3>{{ currentUser.fullName }}</h3>
      <p>{{ currentUser.mail }}</p>
      <hr />
      <h2>Commented errors</h2>
      <!-- Displays errors that the user has commented on.  -->
    </div>
    <div v-if="this.errors !== null">
      <ul v-for="(error, index) in this.errors" v-bind:key="index">
        <li>
          <div>
            <router-link
              :to="{
                name: 'errorInfo',
                params: { id: idArray[index] },
              }"
            >
              <h3>{{ error.message }}</h3>
            </router-link>
          </div>
          <!-- Comments -->
          <div>
            <ul
              v-for="(errorIndex, index) in error.comments"
              v-bind:key="index"
            >
              <div v-if="errorIndex.userName == currentUser.fullName">
                <li class="comment-field">
                  <p>{{ errorIndex.userComment }}</p>
                  <br />
                  <br />
                </li>
              </div>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UserById",
  components: {},
  data: function() {
    return {
      id: this.$route.params.id,
      currentUser: null,
      errors: null,
      idArray: [],
      occurrenceArray: [],
    };
  },
  computed: {
    /**
     * Calls method to link to ErrorDetail view.
     */
    getOccurrenceId(hashNumber) {
      return this.getOneOccurrenceByHash(hashNumber);
    },
  },
  mounted() {
    /**
     * Calls getUser when component is mounted to get user.
     */
    this.getUser();
  },
  methods: {
    /**
     * Gets user by router param id. Result is stored in currentUser.
     */
    getUser: function() {
      axios
        .get("http://localhost:3000/errorRouter/userById", {
          params: { queryData: this.id },
        })
        .then(async (response) => {
          this.currentUser = await response.data;
          await this.getErrors();
        });
    },
    /**
     * Gets latest occurrence related to error. These are used to make a link 
     * to the related occurrence in ErrorDetailView.
     * @param {String} hashNumber Error occurrence is found by hashNumber.
     */
    getOneOccurrenceByHash: async function(hashNumber) {
      await axios
        .get("http://localhost:3000/errorRouter/occurrenceByHash", {
          params: { queryData: hashNumber },
        })
        .then(async (response) => {
          await this.idArray.push(response.data);
        });
    },
    /**
     * Gets errors that the user have made comments to. Calls getHashArray
     */
    getErrors: async function() {
      axios
        .get("http://localhost:3000/errorRouter/userActivity", {
          params: { queryData: this.id },
        })
        .then(async (response) => {
          this.errors = await response.data;
          await this.getHashArray();
        });
    },
    /**
     * Calls getOneOccurrenceByHash to get one occurrence id number for every error.
     */
    getHashArray: async function() {
      for (let i = 0; i < this.errors.length; i++) {
        await this.getOneOccurrenceByHash(this.errors[i].hashNumber);
      }
    },
  },
};
</script>

<style scoped>
p {
  display: inline;
}
</style>
