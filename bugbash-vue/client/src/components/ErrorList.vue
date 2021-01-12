<template>
  <div class="monitor-viewer">
    <h1>Error List</h1>
    <div class="filter-bar">
      <input type="text" v-model="searchInput" v-on:input="search" />
      <button v-on:click="dateToggleFunction">
        Date Toggle
      </button>
      <button v-on:click="messageToggleFunction">
        Message Toggle
      </button>
      <button v-on:click="urlToggleFunction">
        Url Toggle
      </button>
      <!-- <button v-on:click="toggle = 'error-list'">
        View all monitor errors
      </button> -->
    </div>

    <table class="error-list">
      <tr>
        <th v-if="$store.state.dateState == true">Date</th>
        <th v-if="$store.state.messageState == true">Message</th>
        <th v-if="$store.state.urlState == true">Url</th>
        <th></th>
      </tr>
      <tr
        v-for="(error, index) in $store.getters.errors"
        v-bind:key="index"
        class="result-line"
        :class="{ active: index === activeItem }"
      >
        <td
          @click="moreErrorDetails(error)"
          v-if="$store.state.dateState == true"
        >
          {{ new Date(error.timeStamp).toLocaleString() }}
        </td>
        <td
          @click="moreErrorDetails(error)"
          v-if="$store.state.messageState == true"
        >
          {{ error.message }}
        </td>
        <td v-if="$store.state.urlState == true">
          <a :href="error.session.url" target="_blank">{{
            error.session.url.substring(7)
          }}</a>
        </td>
        <td>
          <font-awesome-icon
            @click="deleteRow(error._id)"
            icon="trash-alt"
          ></font-awesome-icon>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ErrorList",
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
    moreErrorDetails(errorInfo) {
      this.$emit("emitFromErrorList", errorInfo);
    },
    search: function() {
      this.$store.commit("onFilterChange", this.searchInput);
    },
    deleteRow(index) {
      if (confirm("Are you sure you want to delete row?") === true) {
        axios
          .delete("http://localhost:3000/errorRouter/" + index)
          .then((response) => {
            console.log("Delete response: " + response.data._id);
            alert("Row deleted.");
            window.location.reload(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
.filter-bar {
  display: flex;
  padding: 1em 0;
}

.error-list {
  width: 100%;
  text-align: left;
}

.result-line:hover {
  background-color: rgb(229, 233, 240);
}

.result-line td:last-child {
  text-align: right;
}

table {
  border-collapse: collapse;
}

table tr td, table tr th { padding: 0; }

input {
  margin-right: 1.2em;
}

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

</style>
