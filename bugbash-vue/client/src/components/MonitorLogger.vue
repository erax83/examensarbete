<template>
  <div class="monitor-viewer">
    <h1>Logged errors</h1>

    <table style="width:100%">
      <tr>
        <th v-if="$store.state.dateState == true">Date</th>
        <th v-if="$store.state.messageState == true">Message</th>
        <th v-if="$store.state.urlState == true">Url</th>
      </tr>
      <tr v-for="(error, index) in $store.getters.errors" v-bind:key="index">
        <td v-if="$store.state.dateState == true">{{ new Date(error.timeStamp * 1000)  }}</td>
        <td v-if="$store.state.messageState == true">{{ error.message }}</td>
        <td v-if="$store.state.urlState == true">{{ error.session.url }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "MonitorLogger"
  //  data: function() {
  //   return {
  //     urlLink: error.session.url,
  //   };
  // },
  // props: {
  //   errors: Array,
  // },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
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
