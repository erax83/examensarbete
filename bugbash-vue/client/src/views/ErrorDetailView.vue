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
    <!-- <div v-if="this.newErrorOccurrence !== null">
      <h3>Date</h3>
      <p>{{ new Date(newErrorOccurrence[0].timeStamp).toLocaleString() }}</p>
      <h3>ID</h3>
      <p>{{ newErrorOccurrence[0]._id }}</p>
      <h3>Stacktrace</h3>
      <p>{{ newErrorOccurrence[0].stack }}</p>
      <h3>Language</h3>
      <p>{{ newErrorOccurrence[0].language }}</p>
      <h3>Plugins</h3>
      <p v-if="newErrorOccurrence[0].plugins == true">
        {{ newErrorOccurrence[0].plugins[0] }}
      </p>
      <h3>Browser Window Width</h3>
      <p>{{ newErrorOccurrence[0].browserWindowWidth }}</p>
      <h3>Browser Window Height</h3>
      <p>{{ newErrorOccurrence[0].browserWindowHeight }}</p>
    </div> -->
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
      // errorOccurrence: null,
      // occurrence: this.$store.getters.currentOccurrence,
      //   errorValue: this.error,
      //   selected: Object,
      //   testId: "",
      // newErrorOccurrence: null,
    };
  },
  computed: {
    errorOccurrence() {
      return this.errOccurrence;
    },
  },

  // watch: {
  //   error: function(newVal) {
  //     this.errorValue = newVal;
  //     console.log(JSON.stringify("inside error: " + this.errorValue));
  //   },

  // },
  // },
  methods: {
    onSelectChange: async function() {
      this.id = await this.selected;

      this.getOccurrencesById(this.id);
      this.$router.push({ name: "errorInfo", params: { id: this.id } });

      // var occurrenceId = await this.selected;
      // console.log("Something is working: " + occurrenceId);
      // this.id = await occurrenceId;
      // axios
      //   .get("http://localhost:3000/errorRouter/occurrencesById", {
      //     params: { queryData: occurrenceId },
      //   })
      //   .then((response) =>
      //     this.$store.commit("changeCurrentOccurrence", response.data)
      //   )
      //   .then(() => {
      //     this.newErrorOccurrence = this.$store.getters.currentOccurrence;
      //     // console.log(JSON.stringify(response.data));
      //   })
      //   .then(() => {
      //     this.$router.push({
      //       name: "errorInfo",
      //       params: { id: occurrenceId },
      //     });
      //   });
    },
    getOccurrencesDates: async function() {
      var errorHashNumber = await this.errOccurrence[0].hashNumber;
      // console.log("inside getErrorList: " + errorHashNumber);
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

      // var errorId = await this.$store.getters.error(this.$route.params.id);
      // newError = null;
      // axios
      //   .get("http://localhost:3000/errorRouter/occurrencesById", {
      //     params: { queryData: this.$route.params.id },
      //   })
      //   // .then((response) => this.$store.commit("changeErrors", response.data));
      //   .then((response) => {
      //     console.log("response: " + response);
      //     this.errOccurrence = response.data;
      //   });
    },
    // getErrorMessages: async function() {
    //   console.log("inside detail: " + this.errorValue.message);
    //   let arr = await this.allOccurrences;
    //   return arr;
    // },
  },

  updated: function() {
    this.getOccurrencesDates();
  },

  mounted() {
    try {
      axios
        .get("http://localhost:3000/errorRouter/occurrencesById", {
          params: { queryData: this.id },
        })
        .then((response) => {
          this.errOccurrence = response.data;
        });
    } catch (err) {
      console.log(err);
    }
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
