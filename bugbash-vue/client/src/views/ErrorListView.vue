<template>
  <!-- Opening page, list registered errors. -->
  <div class="error-viewer">
    <h1>Error List</h1>
    <!-- Filter section. Filters types of data by search word and collumns. -->
    <div class="filter-bar">
      <!-- Search in errormessages by written input from user. -->
      <input type="text" v-model="searchInput" v-on:input="search" />
      <br class="small-screen-break" />
      <!-- Buttons for filtering collumns. -->
      <div class="filter-buttons">
        <button v-on:click="dateToggleFunction">
          Date Toggle
        </button>
        <button v-on:click="messageToggleFunction">
          Message Toggle
        </button>
        <button v-on:click="urlToggleFunction">
          Url Toggle
        </button>
      </div>
    </div>
    <hr />
    <!-- Table displaying errors. -->
    <table class="error-list">
      <!-- Collumn heading. -->
      <thead>
        <tr>
          <th v-if="$store.state.dateState == true">Date</th>
          <th v-if="$store.state.messageState == true">Message</th>
          <th>Occurrences</th>
          <th v-if="$store.state.urlState == true">Url</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!-- Errors with info from getErrorList method. Displayed in tablecollumns. -->
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
            <span class="error-mobile-prefix"><b>Date </b></span>
            <router-link
              :to="{
                name: 'errorInfo',
                params: { id: error.occurrenceDetails[0]._id },
              }"
              >{{
                new Date(error.occurrenceDetails[0].timeStamp).toLocaleString()
              }}</router-link
            >
          </td>
          <td
            @click="moreErrorDetails(error)"
            v-if="$store.state.messageState == true"
          >
            <span class="error-mobile-prefix"><b>Message </b></span>
            <router-link
              :to="{
                name: 'errorInfo',
                params: { id: error.occurrenceDetails[0]._id },
              }"
              >{{ error.message }}</router-link
            >
          </td>
          <td @click="moreErrorDetails(error)">
            <span class="error-mobile-prefix"><b>Occurrences </b></span>
            <router-link
              :to="{
                name: 'errorInfo',
                params: { id: error.occurrenceDetails[0]._id },
              }"
              >{{ error.occurrencesCount }}</router-link
            >
          </td>
          <td v-if="$store.state.urlState == true">
            <span class="error-mobile-prefix"><b>Url </b></span>
            <a :href="error.occurrenceDetails[0].session.url" target="_blank">{{
              error.occurrenceDetails[0].session.url.substring(7)
            }}</a>
          </td>
          <td>
            <font-awesome-icon
              @click="deleteRow(error.occurrenceDetails[0].hashNumber)"
              icon="trash-alt"
            ></font-awesome-icon>
          </td>
        </tr>
      </tbody>
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
    /**
     * Calls getErrors method when component is mounted.
     */
    this.getErrors();
  },
  methods: {
    /**
     * Gets list of errors from database and store the list in store.
     */
    getErrors: async function() {
      axios
        .get("http://localhost:3000/errorRouter/errorList")
        .then((response) =>
          this.$store.commit("changeErrorsList", response.data)
        );
    },
    /**
     * Gets a list of errors from store to be displayed in a table.
     * @return {Array} Return array of error information from store.
     */
    getErrorsList() {
      let arr = this.$store.getters.errorsList;
      return arr;
    },
    /**
     * 
     */
    // selectItem(index) {
    //   if (this.activeItem == null || this.activeItem != index) {
    //     this.activeItem = index;
    //   } else {
    //     this.activeItem = null;
    //   }
    // },
    /**
     * Alter the current occurrence in store.
     */
    moreErrorDetails(errorInfo) {
      this.$store.commit("changeCurrentOccurrence", errorInfo);
    },
    /**
     * The list off errors is filtered in store by input from user.
     */
    search: function() {
      this.$store.commit("onFilterChange", this.searchInput);
    },
    /**
     * Deletes chosen error together with all coresponding occurrences in database. 
     * @param {String} index Hashnumber of error and all coresponding occurrences. 
     */
    deleteRow(index) {
      if (confirm("Are you sure you want to delete row?") === true) {
        axios
          .delete("http://localhost:3000/errorRouter/" + index)
          .then((response) => {
            console.log("Delete response: " + response.data);
            alert("Row deleted.");
            this.getErrors();
            window.location.reload(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    /**
     * Called from the togglebutton to filter collumn in error information table.
     * Alters Boolean value in store.  
     */
    dateToggleFunction: function() {
      var trueOrFalse = this.$store.getters.dateState;
      if (trueOrFalse == true) {
        trueOrFalse = false;
      } else {
        trueOrFalse = true;
      }
      this.$store.commit("changeDateToggle", trueOrFalse);
    },
    /**
     * Called from the togglebutton to filter collumn in error information table.
     * Alters Boolean value in store.  
     */
    messageToggleFunction: function() {
      var trueOrFalse = this.$store.getters.messageState;
      if (trueOrFalse == true) {
        trueOrFalse = false;
      } else {
        trueOrFalse = true;
      }
      this.$store.commit("changeMessageToggle", trueOrFalse);
    },
    /**
     * Called from the togglebutton to filter collumn in error information table.
     * Alters Boolean value in store.  
     */
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
.error-list {
  width: 95%;
  text-align: left;
}

.result-line:hover {
  background-color: rgb(229, 233, 240);
}

.result-line td:last-child {
  text-align: right;
}

table tr td,
table tr th {
  padding: 3;
}

input {
  margin-right: 1.2em;
  height: 1.6em;
  padding: 0.4em;
  align-self: center;
}



@media screen and (max-width: 600px) {
  .filter-buttons {
    display: flex;
    flex-direction: row;
    padding: 1em 0;
  }
}

@media screen and (min-width: 501px) {
  .filter-bar {
    display: flex;
    flex-direction: row;
  }
}
</style>
