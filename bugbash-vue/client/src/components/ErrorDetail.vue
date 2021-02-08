<template>
  <div class="detail-view">
    <h1>{{ error.message }}</h1>
    <button @click="backToErrorList()">Tillbaka</button>
    <button @click="getOccurrencesDates()">Updatera</button>
    <select v-model="selected" @change="onSelectChange()">
      <option
        v-for="(option, index) in this.$store.getters.errors"
        v-bind:key="index"
        :value="option._id"
      >
        {{ new Date(option.timeStamp).toLocaleString() }}
      </option>
    </select>
    <div v-if="this.newOccurrence == null">
      <h3>Date</h3>
      <p>{{ new Date(error.inventory[0].timeStamp).toLocaleString() }}</p>
      <h3>ID</h3>
      <p>{{ error.inventory[0]._id }}</p>
      <h3>Stacktrace</h3>
      <p>{{ error.inventory[0].stack }}</p>
      <h3>Language</h3>
      <p>{{ error.inventory[0].language }}</p>
      <h3>Plugins</h3>
      <p v-if="error.plugins == true">{{ error.inventory[0].plugins }}</p>
      <h3>Browser Window Width</h3>
      <p>{{ error.inventory[0].browserWindowWidth }}</p>
      <h3>Browser Window Height</h3>
      <p>{{ error.inventory[0].browserWindowHeight }}</p>
    </div>
    <div v-if="this.newOccurrence !== null">
      <h3>Date</h3>
      <p>{{ new Date(newOccurrence[0].timeStamp).toLocaleString() }}</p>
      <h3>ID</h3>
      <p>{{ newOccurrence[0]._id }}</p>
      <h3>Stacktrace</h3>
      <p>{{ newOccurrence[0].stack }}</p>
      <h3>Language</h3>
      <p>{{ newOccurrence[0].language }}</p>
      <!-- <h3>Plugins</h3>
      <p v-if="error[0].plugins == true">{{ newOccurrence[0].plugins[0] }}</p> -->
      <h3>Browser Window Width</h3>
      <p>{{ newOccurrence[0].browserWindowWidth }}</p>
      <h3>Browser Window Height</h3>
      <p>{{ newOccurrence[0].browserWindowHeight }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ErrorDetail",
  props: ["error"],
  data: function() {
    return {
      errorValue: this.error,
      selected: Object,
      // testId: "",
      newOccurrence: null,
    };
  },
  watch: {
    error: function(newVal) {
      this.errorValue = newVal;
      console.log(JSON.stringify("inside error: " + this.errorValue));
    },
  },
  methods: {
    onSelectChange: async function() {
      var occurrenceId = await this.selected;
      console.log("Something is working: " + this.selected);
      axios
        .get("http://localhost:3000/errorRouter/occurrencesById", {
          params: { queryData: occurrenceId },
        })
        .then((response) =>
          this.$store.commit("changeCurrentOccurrence", response.data)
        )
        .then(() => {
          this.newOccurrence = this.$store.getters.currentOccurrence;
          // console.log(JSON.stringify(response.data));
        });
    },
    backToErrorList() {
      this.$emit("emitFromErrorDetail");
    },
    getOccurrencesDates: async function() {
      var errorHashNumber = await this.errorValue.hashNumber;
      console.log("inside getErrorList: " + errorHashNumber);
      axios
        .get("http://localhost:3000/errorRouter/occurrencesByHash", {
          params: { queryData: errorHashNumber },
        })
        .then((response) => this.$store.commit("changeErrors", response.data));
    },
    // getErrorMessages: async function() {
    //   console.log("inside detail: " + this.errorValue.message);
    //   let arr = await this.allOccurrences;
    //   return arr;
    // },
  },
  // updated: function() {
  //   this.getOccurrencesDates();
  // },
};
</script>

<style>
.detail-view {
  max-width: 1024px;
  align-self: center;
  width: 100%;
}
</style>
