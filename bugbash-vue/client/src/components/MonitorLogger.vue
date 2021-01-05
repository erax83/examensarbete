<template>
  <div class="monitor-viewer">
    <h1>Logged errors</h1>
    <nav>
      <button v-on:click="idToggleFunction">
        ID Toggle
      </button>
      <button v-on:click="dateToggleFunction">
        Date Toggle
      </button>
      <button v-on:click="messageToggleFunction">
        Message Toggle
      </button>
      <button v-on:click="urlToggleFunction">
        Url Toggle
      </button>
      <!-- <button v-on:click="toggle = 'monitor-logger'">
        View all monitor errors
      </button> -->
      <input type="text" v-model="searchInput" v-on:input="search" />
    </nav>

    <table style="width:100%">
      <tr>
        <th v-if="$store.state.idState == true">ID</th>
        <th v-if="$store.state.dateState == true">Date</th>
        <th v-if="$store.state.messageState == true">Message</th>
        <th v-if="$store.state.urlState == true">Url</th>
        <!-- <th>More info</th> -->
      </tr>
      <tr
        v-for="(error, index) in $store.getters.errors"
        v-bind:key="index"
        class="result-line"
        :class="{ active: index === activeItem }"
      >
        <td @click="moreInfo(error)" v-if="$store.state.idState == true">
          {{ error._id }}
        </td>
        <td @click="moreInfo(error)" v-if="$store.state.dateState == true">
          {{ new Date(error.timeStamp).toLocaleString() }}
        </td>
        <td @click="moreInfo(error)" v-if="$store.state.messageState == true">
          {{ error.message }}
        </td>
        <td v-if="$store.state.urlState == true">
          <a :href="error.session.url" target="_blank">{{
            error.session.url.substring(7)
          }}</a>
        </td>
        <!-- <td>
          <button @click="moreInfo(error)">
            Show more info
          </button>
        </td> -->
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "MonitorLogger",
  data: function() {
    return {
      activeItem: null,
      searchInput: null,
    };
  },
  methods: {
    selectItem(index) {
      if (this.activeItem == null || this.activeItem != index) {
        this.activeItem = index;
      } else {
        this.activeItem = null;
      }
    },
    moreInfo(errorInfo) {
      this.$emit("emitFromLogger", errorInfo);
    },
    search: function() {
      this.$store.commit("onFilterChange", this.searchInput);
    },
    idToggleFunction: function() {
      var trueOrFalse = this.$store.getters.idState;
      if (trueOrFalse == true) {
        trueOrFalse = false;
      } else {
        trueOrFalse = true;
      }
      this.$store.commit("changeIdToggle", trueOrFalse);
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
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
td {
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.result-line:hover {
  background-color: rgb(229, 233, 240);
}
</style>
