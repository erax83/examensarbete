<template>
  <div id="app">
    <header class="main-header">
      <a class="logo">Bugbash</a>
      <div class="global-buttons">
        <button><font-awesome-icon icon="bars" /></button>
      </div>
    </header>
    <ErrorList
      v-show="this.$store.getters.componentToggleState === 'error-list'"
      v-on:emitFromErrorList="messageFromErrorList($event)"
    />
    <ErrorDetail
      v-show="this.$store.getters.componentToggleState === 'error-detail'"
      v-bind:error="this.moreErrorInfo"
      v-on:emitFromErrorDetail="messageFromErrorDetail($event)"
    />
  </div>
</template>

<script>
import ErrorList from "./components/ErrorList.vue";
import ErrorDetail from "./components/ErrorDetail.vue";

import axios from "axios";

export default {
  name: "App",
  components: {
    ErrorList,
    ErrorDetail,
  },
  data: function() {
    return {
      moreErrorInfo: Object,
    };
  },
  methods: {
    getErrorList: async function() {
      axios
        .get("http://localhost:3000/errorRouter")
        .then((response) => this.$store.commit("changeErrors", response.data));
    },
    messageFromErrorList(errorInfo) {
      this.moreErrorInfo = errorInfo;
      this.$store.commit("changeComponentToggle", "error-detail");
    },
    messageFromErrorDetail() {
      this.$store.commit("changeComponentToggle", "error-list");
    },
  },
  mounted: function() {
    this.getErrorList();
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap");

body {
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: hsl(210, 29%, 24%);
}

header.main-header {
  display: flex;
  align-items: center;
  background: #388af6;
  color: #fff;
  padding: 0.5em 1em;
}

header button {
  color: #fff;
}

.monitor-viewer {
  max-width: 1024px;
  align-self: center;
  width: 100%;
}

a.logo {
  display: flex;
  flex: 1;
  font-size: 1.4em;
}

nav {
  background-color: whitesmoke;
  height: 100px;
  padding: 20px;
}
button {
  background-color: transparent;
  border: 1px solid #388af6;
  border-radius: 3px;
  color: #333;
  padding: 0.5em 1em;
  margin: 0 0.5em 0 0;
  text-align: center;
  text-decoration: none;
}

button:hover {
  background-color: #388af6;
  color: white;
  cursor: pointer;
}

img {
  border: 3px solid black;
  border-radius: 25px;
}
</style>
