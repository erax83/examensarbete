<template>
  <div id="app">
    <header class="main-header">
      <a class="logo">Bugbash</a>
      <div class="global-buttons">
        <button><font-awesome-icon icon="bars" /></button>
      </div>
    </header>
    <MonitorLogger
      v-show="this.$store.getters.componentToggleState === 'monitor-logger'"
      v-on:emitFromLogger="messageFromLogger($event)"
    />
    <MonitorInfo
      v-show="this.$store.getters.componentToggleState === 'monitor-info'"
      v-bind:error="this.moreErrorInfo"
      v-on:emitFromInfo="messageFromInfo($event)"
    />
  </div>
</template>

<script>
import MonitorLogger from "./components/MonitorLogger.vue";
import MonitorInfo from "./components/MonitorInfo.vue";

import axios from "axios";

export default {
  name: "App",
  components: {
    MonitorLogger,
    MonitorInfo,
  },
  data: function() {
    return {
      moreErrorInfo: Object,
    };
  },
  methods: {
    getMonitorErrors: async function() {
      axios
        .get("http://localhost:3000/errorRouter")
        .then((response) => this.$store.commit("changeErrors", response.data));
    },
    messageFromLogger(errorInfo) {
      this.moreErrorInfo = errorInfo;
      this.$store.commit("changeComponentToggle", "monitor-info");
    },
    messageFromInfo() {
      this.$store.commit("changeComponentToggle", "monitor-logger");
    },
  },
  mounted: function() {
    this.getMonitorErrors();
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
