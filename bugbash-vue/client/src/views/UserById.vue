<template>
  <div class="user-viewer">
    <div v-if="this.currentUser !== null">
      <h2>{{ currentUser.fullName }}</h2>
      <p>{{ currentUser.mail }}</p>
      <h2>Commented errors</h2>
    </div>
    <div v-if="this.errors !== null">
      <ul v-for="(error, index) in this.errors" v-bind:key="index">
        <li>
          <div>
            <router-link
              :to="{
                name: 'errorInfo',
                params: { id: getOneOccurrenceByHash(error.hashNumber) },
              }"
              >{{ error.message }}
            </router-link>
          </div>

          <div>
            <h3>{{ error.message }}</h3>
            <!-- <h3>{{ error.hashNumber}}</h3> -->
          </div>
          <div>
            <ul v-for="(e, index) in error.comments" v-bind:key="index">
              <li>
                <p>{{ e.userComment }}</p>
              </li>
            </ul>
          </div>
        </li>
        <li></li>
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
      // occurrenceId: this.getOneOccurrenceByHash(),
      // testUser: this.userFromStore,
    };
  },
  computed: {
    // getOccurrenceId(hashNumber) {
    //   return this.getOneOccurrenceByHash(hashNumber);
    // },
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
      axios
        .get("http://localhost:3000/errorRouter/occurrenceByHash", {
          params: { queryData: hashNumber },
        })
        .then((response) => {
          console.log("test getOne back: " + response.data._id);
          return response.data._id;
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
      axios
        .get("http://localhost:3000/errorRouter/userActivity", {
          params: { queryData: this.id },
        })
        .then((response) => {
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
/* .sign-in {
  margin: 2em;
} */
</style>
