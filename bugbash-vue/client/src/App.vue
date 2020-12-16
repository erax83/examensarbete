<template>
  <div id="app">
    <nav>
      <div>
        <img
          src="./assets/bugbashlogo.jpeg"
          alt="bugbash-logo"
          width="18"
          height="18"
          style="display:inline;"
        />
        <h1 style="display:inline; padding: 5px;">
          Bugbash
        </h1>
      </div>

      <button v-on:click="dateToggleFunction">
        Date Toggle
      </button>
      <button v-on:click="messageToggleFunction">
        Message Toggle
      </button>
      <button v-on:click="urlToggleFunction">
        Url Toggle
      </button>
      <button v-on:click="toggle = 'monitor-logger'">
        View all monitor errors
      </button>
      <input type="text" v-model="searchInput" v-on:input="search" />
      <!-- <button v-on:click="toggle = 'monitor-latest'">
        View latest errors
      </button> -->
    </nav>

    <MonitorLogger v-show="toggle === 'monitor-logger'" />
    <!-- <MonitorLatest
      v-show="toggle === 'monitor-latest'"
      :monitorErrors="errors"
    /> -->

    <!-- <Form />
    <Display /> -->
  </div>
</template>

<script>
import MonitorLogger from "./components/MonitorLogger.vue";
// import Form from "./components/Form.vue";
// import Display from "./components/Display.vue";
// import MonitorLatest from "./components/MonitorLatest.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    MonitorLogger,
    // Form,
    // Display,
    // MonitorLatest,
  },
  data: function() {
    return {
      toggle: "monitor-logger",
      searchInput: null,
      // errors: null,
    };
  },
  methods: {
    search: function() {
      this.$store.commit("onFilterChange", this.searchInput);
    },
    getMonitorErrors: async function() {
      axios
        .get("http://localhost:3000/errorRouter")
        .then((response) => this.$store.commit("changeErrors", response.data));
    },
    dateToggleFunction: function() {
      var trueOrFalse = this.$store.getters.dateState;
      if (trueOrFalse == true) {
        trueOrFalse = false;
      } else {
        trueOrFalse = true;
      }
      this.$store.commit("changeDateToggle", trueOrFalse);
    },
    messageToggleFunction: function() {
      var trueOrFalse = this.$store.getters.messageState;
      if (trueOrFalse == true) {
        trueOrFalse = false;
      } else {
        trueOrFalse = true;
      }
      this.$store.commit("changeMessageToggle", trueOrFalse);
    },
    urlToggleFunction: function() {
      var trueOrFalse = this.$store.getters.urlState;
      if (trueOrFalse == true) {
        trueOrFalse = false;
      } else {
        trueOrFalse = true;
      }
      this.$store.commit("changeUrlToggle", trueOrFalse);
    },
  },
  mounted: function() {
    this.getMonitorErrors();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1 {
  font-family: "Black Ops One";
}

nav {
  background-color: whitesmoke;
  height: 100px;
  padding: 20px;
}
button {
  background-color: lightsteelblue;
  border: 2px solid steelblue;
  color: white;
  padding: 15px 32px;
  margin: 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

button:hover {
  background-color: steelblue;
  color: white;
}

img {
  border: 3px solid black;
  border-radius: 25px;
}
</style>
