<template>
  <div class="detail-view">
    <h1>{{ error.message }}</h1>
    <button @click="backToErrorList()">Tillbaka</button>
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
    <table>  
      <tr>    
        <th>Message</th>
      </tr>
      <tr
        v-for="(err, index) in getErrorMessages()"
        v-bind:key="index"
        class="result-line"
        :class="{ active: index === activeItem }"
      >
        <td>
          {{ err.timeStamp }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
 
export default {
  name: "ErrorDetail",
  props: {
    error: Object,
  },
  methods: {
    backToErrorList() {
      this.$emit("emitFromErrorDetail");
    },
    getErrorList: async function() {
      axios
        .get("http://localhost:3000/errorRouter/message", {
          params: { answer: 42 },
        })
        .then((response) => this.$store.commit("changeErrors", response.data));
    },
    getErrorMessages() {
      console.log('inside detail: ' + this.error.message);
      let arr = this.$store.getters.errors.reverse();
      return arr;
    },
  },
  mounted: function() {
    this.getErrorList();
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
