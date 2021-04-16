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
      <!-- Displaying errors that the user have made comments to. -->
    </div>
    <div v-if="this.errors !== null">
      <ul v-for="(error, index) in this.errors" v-bind:key="index">
        <li>
          <div>
            <router-link
              :to="{
                name: 'errorInfo',
                params: { id: routerParams },
              }"
            >
              <h3>{{ error.message }}</h3>
            </router-link>
          </div>
          <!-- Comments -->
          <div>
            <ul v-for="(errorIndex, index) in error.comments" v-bind:key="index">
              <div v-if="errorIndex.userName == currentUser.fullName">
                <li class="comment-field">
                  <p>-</p>
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
      routerParams: "6066ee9aa05f0690bc73cd50",
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
     * Gets latest occurrence corresponding with error.
     * @param {String} hashNumber Error occurrence is found by hashNumber.
     */
    getOneOccurrenceByHash(hashNumber) {
      console.log("hash: " + hashNumber);
      axios
        .get("http://localhost:3000/errorRouter/occurrenceByHash", {
          params: { queryData: hashNumber },
        })
        .then((response) => {
          return response.data;
        });
    },
    /**
     * Gets errors that the user have mede comments to. 
     */
    getErrors: async function() {
      axios
        .get("http://localhost:3000/errorRouter/userActivity", {
          params: { queryData: this.id },
        })
        .then((response) => {
          this.errors = response.data;
        });
    },
  },
};
</script>

<style scoped>
p {
  display: inline;
}
</style>
