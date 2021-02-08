<template>
  <div class="detail-view">
    <h1>{{ error.message }}</h1>
    <button @click="backToErrorList()">Tillbaka</button>
    <button @click="getErrorList()">Updatera</button>
    <select v-model="selected" @change="onChange()">
      <option
        v-for="(option, index) in this.$store.getters.errors"
        v-bind:key="index"
        :value="option._id"
      >
        {{ new Date(option.timeStamp).toLocaleString() }}
      </option>
    </select>
    <div v-if="this.newError == null">
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
    <div v-if="this.newError !== null">
      <h3>Date</h3>
      <p>{{ new Date(newError[0].timeStamp).toLocaleString() }}</p>
      <h3>ID</h3>
      <p>{{ newError[0]._id }}</p>
      <h3>Stacktrace</h3>
      <p>{{ newError[0].stack }}</p>
      <h3>Language</h3>
      <p>{{ newError[0].language }}</p>
      <!-- <h3>Plugins</h3>
      <p v-if="error[0].plugins == true">{{ newError[0].plugins[0] }}</p> -->
      <h3>Browser Window Width</h3>
      <p>{{ newError[0].browserWindowWidth }}</p>
      <h3>Browser Window Height</h3>
      <p>{{ newError[0].browserWindowHeight }}</p>
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
      somevar: this.error,
      selected: Object,
      testId: "",
      newError: null,
      // option: String,
      // allOccurrences: Array
    };
  },
  watch: {
    error: function(newVal) {
      this.somevar = newVal;
      console.log(JSON.stringify("inside error: " + this.somevar));
    },
  },
  methods: {
    onChange: async function() {
      var occurrenceId = await this.selected;
      console.log("Something is working: " + this.selected);
      axios
        .get("http://localhost:3000/errorRouter/time", {
          params: { queryData: occurrenceId },
        })
        .then((response) =>
          this.$store.commit("changeCurrentOccurrence", response.data)
        )
        .then(() => {
          // this.somevar = response.data;
          this.newError = this.$store.getters.currentOccurrence;
          console.log(JSON.stringify(this.newError[0].stack));
          // const x = JSON.stringify(response.data);
          // console.log(response.data.message);
          // console.log(JSON.stringify(response.data));
        });
    },
    // newSomeVar: async function(newVal) {
    //   this.somevar = await newVal;
    //   console.log(JSON.stringify('somevar: ' + this.somevar.data));
    // },
    backToErrorList() {
      this.$emit("emitFromErrorDetail");
    },
    getErrorList: async function() {
      var x = await String;
      x = await this.somevar.message;
      console.log("inside getErrorList: " + x);
      axios
        .get("http://localhost:3000/errorRouter/message", {
          params: { queryData: x },
        })
        .then((response) => this.$store.commit("changeErrors", response.data));
      // .then((response) => this.allOccurences = response);
      // .then(function(response) {
      //   return response.data;
      // });
    },
    // getErrorMessages: async function() {
    //   console.log("inside detail: " + this.somevar.message);
    //   let arr = await this.allOccurrences;
    //   return arr;
    // },
  },
  // updated: function() {
  //   this.getErrorList();
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
