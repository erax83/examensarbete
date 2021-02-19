<template>
  <div class="detail-view">
    <h1>{{ this.errorOccurrence[0].message }}</h1>
    <button>
      <router-link to="/">Back</router-link>
    </button>
    <!-- <button @click="getOccurrencesDates()">Uppdatera</button> -->
    <h3>Earlier occurrences</h3>
    <select v-model="selected" @change="onSelectChange()">
      <option value="" disabled selected>Choose...</option>
      <option
        v-for="(option, index) in this.$store.getters.errors.slice().reverse()"
        v-bind:key="index"
        :value="option._id"
      >
        {{ new Date(option.timeStamp).toLocaleString() }}
      </option>
    </select>
    <div v-if="this.newErrorOccurrence == null">
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
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ErrorDetailView",
  data: function() {
    return {
      id: this.$route.params.id,
      errOccurrence: [],
    };
  },
  computed: {
    errorOccurrence() {
      return this.errOccurrence;
    },
  },
  methods: {
    onSelectChange: async function() {
      this.id = await this.selected;
      this.getOccurrencesById(this.id);
      this.$router.replace({ name: "errorInfo", params: { id: this.id } });
    },
    getOccurrencesDates: async function() {
      var errorHashNumber = await this.errOccurrence[0].hashNumber;
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
            this.errOccurrence = response.data;
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
