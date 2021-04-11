<template>
  <div class="user-viewer">
    <div><h1>User</h1></div>
    <div v-if="this.currentUser !== null">
      <h3>{{ currentUser.fullName }}</h3>
      <p>{{ currentUser.mail }}</p>
      <hr />
      <h2>Commented errors</h2>
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
              <!-- <p>{{ error.occurrenceDetails[0]._id }}</p> -->

          </div>
          <div>
            <ul v-for="(e, index) in error.comments" v-bind:key="index">
              <div v-if="e.userName == currentUser.fullName">
                <li id="user-comment">
                  <p>- </p>
                  <p>{{ e.userComment }}</p>
                </li>
              </div>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <!-- <div v-if="this.testUser !== null">
      <ul v-for="(error, index) in this.testUser" v-bind:key="index">
        <li>{{ error.message }}</li>

        
      </ul>
    </div> -->
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
      // occurrenceId: this.getOneOccurrenceByHash(),
      // testUser: this.userFromStore,
    };
  },
  computed: {
    getOccurrenceId(hashNumber) {
      console.log("hash get: " + hashNumber);

      return this.getOneOccurrenceByHash(hashNumber);
    },
  },
  methods: {
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
    getOneOccurrenceByHash(hashNumber) {
      console.log("hash: " + hashNumber);
      axios
        .get("http://localhost:3000/errorRouter/occurrenceByHash", {
          params: { queryData: hashNumber },
        })
        .then((response) => {
          console.log("test getOne back: " + response.data);
          debugger;
          return response.data;
        });
    },
    // getErrorActivities: function() {
    //   axios
    //     .get("http://localhost:3000/errorRouter/userActivity")
    //     .then((response) => {
    //       this.errors = response.data;
    //     });
    // },
    getErrors: async function() {
      console.log("check: " + this.id);

      axios
        .get("http://localhost:3000/errorRouter/userActivity", {
          params: { queryData: this.id },
        })
        .then((response) => {
          console.log("check: " + JSON.stringify(response.data));

          this.errors = response.data;
        });
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style>
/* .comment-message {
  display: inline;
} */
p {
  display: inline;
}
</style>
