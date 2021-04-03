<template>
  <div class="user-viewer">
    <div v-if="this.currentUser !== null">
      <h2>{{ currentUser.fullName }}</h2>
      <p>{{ currentUser.mail }}</p>
      <h2>Comments</h2>
    </div>
    <div v-if="this.errors !== null">
      <ul v-for="(error, index) in this.errors" v-bind:key="index">
        <li>
          <div>
            <p>{{ error.message }}</p>
          </div>
          <div>
            <ul v-for="(e, index) in error.comments" v-bind:key="index">
              <li >
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
      testUser: this.userFromStore,
    };
  },
  computed: {
    userFromStore() {
      return this.$store.getters.userErrors(this.id);
    },
  },
  methods: {
    getUser: function() {
      axios
        .get("http://localhost:3000/errorRouter/userById", {
          params: { queryData: this.id },
        })
        .then(async (response) => {
          console.log("test: " + response.data);
          this.currentUser = await response.data;
          await this.getErrors();
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
          console.log(JSON.stringify(response.data));
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
