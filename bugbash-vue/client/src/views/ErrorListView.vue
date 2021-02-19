<template>
  <div class="error-viewer">
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
        <th>Quantity</th>
        <th v-if="$store.state.urlState == true">Url</th>
        <th></th>
      </tr>
      <tr
        v-for="(error, index) in getErrorsList()"
        v-bind:key="index"
        class="result-line"
        :class="{ active: index === activeItem }"
      >
        <td
          @click="moreErrorDetails(error)"
          v-if="$store.state.dateState == true"
        >
          <router-link to="/errordetailview">{{
            new Date(error.occurrenceDetails[0].timeStamp).toLocaleString()
          }}</router-link>
          <!-- {{ new Date(error.occurrenceDetails[0].timeStamp).toLocaleString() }} -->
        </td>
        <td
          @click="moreErrorDetails(error)"
          v-if="$store.state.messageState == true"
        >
          <router-link :to="{ name: 'errorInfo', params: { id: error.occurrenceDetails[0]._id } }">{{ error.message }}</router-link>
          <!-- {{ error.message }} -->
        </td>
        <td @click="moreErrorDetails(error)">
          <router-link to="/errordetailview">{{
            error.occurrencesCount
          }}</router-link>
          <!-- {{ error.occurrencesCount }} -->
        </td>
        <td v-if="$store.state.urlState == true">
          <a :href="error.occurrenceDetails[0].session.url" target="_blank">{{
            error.occurrenceDetails[0].session.url.substring(7)
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
  name: "ErrorListView",
  data: function() {
    return {
      activeItem: null,
      searchInput: null,
    };
  },
  mounted: function() {
    this.getErrors();
  },
  methods: {
    getErrors: async function() {
      axios
        .get("http://localhost:3000/errorRouter/errorList")
        .then((response) =>
          this.$store.commit("changeErrorsList", response.data)
        );
    },
    // messageFromErrorList(errorInfo) {
    //   this.moreErrorInfo = errorInfo;
    //   this.$store.commit("changeComponentToggle", "error-detail");
    // },
    // messageFromErrorDetail() {
    //   this.$store.commit("changeComponentToggle", "error-list");
    // },
    getErrorsList() {
      let arr = this.$store.getters.errorsList.reverse();
      return arr;
    },
    selectItem(index) {
      if (this.activeItem == null || this.activeItem != index) {
        this.activeItem = index;
      } else {
        this.activeItem = null;
      }
    },
    moreErrorDetails(errorInfo) {
    //   const errorMessage = errorInfo.message;
    //   console.log("errorInfo: " + errorMessage);
    //   this.$store.commit("changeCurrentMessage", errorMessage);
    //   this.$emit("emitFromErrorList", errorInfo);
         this.$store.commit("changeCurrentOccurrence", errorInfo);
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

table tr td,
table tr th {
  padding: 0;
}

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

/* a {
  color: #42b983;
} */
</style>
