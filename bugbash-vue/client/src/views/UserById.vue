<template>
  <div class="user-viewer">
    <h1>User By Id</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserById",
  components: {},
  data: function() {
    return {};
  },
  computed: {},
  methods: {
    getActivities: async function() {
      axios
        .get("http://localhost:3000/errorRouter/userActivity")
        .then((response) => {
          const r = response.data;
          console.log(r);
          return r;
        });
    },
  },
};
</script>

<style>
/* .sign-in {
  margin: 2em;
} */
</style>
