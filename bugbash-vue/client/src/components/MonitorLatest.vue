<template>
  <div class="monitor-latest">
    <h1>Monitor Latest</h1>
    <table style="width:100%">
      <tr>
        <th>Message</th>
        <th>Stack</th>
        <th>Timestamp</th>
        <th>Start Date</th>
        <th>Duration</th>
        <th>Url</th>
      </tr>
      <tr
        v-for="(monitorError, index) in monitorErrors.slice(1).slice(-3)"
        v-bind:key="index"
      >
        <td>{{ monitorError.message }}</td>
        <td>{{ monitorError.stack }}</td>
        <td>{{ monitorError.timeStamp }}</td>
        <td>{{ monitorError.session.startDate }}</td>
        <td>{{ monitorError.session.duration }}</td>
        <td>{{ monitorError.session.url }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "MonitorLatest",
  props: {
    monitorErrors: Array,
  },
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
