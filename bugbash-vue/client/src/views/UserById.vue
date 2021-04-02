<template>
  <div class="user-viewer">
    <div v-if="this.currentUser !== null">
      <h2>{{ currentUser.fullName }}</h2>
      <h2>{{ currentUser.mail }}</h2>
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
    };
  },
  computed: {},
  methods: {
    getUser: function() {
      debugger;
      axios
        .get("http://localhost:3000/errorRouter/userById", {
          params: { queryData: this.id },
        })
        .then((response) => {
          debugger;
          console.log("test: " + response.data);
          debugger;
          this.currentUser = response.data;
          debugger;
        });
    },
    // getActivities: async function() {
    //   axios
    //     .get("http://localhost:3000/errorRouter/userActivity")
    //     .then((response) => {
    //       const r = response.data;
    //       console.log(r);
    //       return r;
    //     });
    // },
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
