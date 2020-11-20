<template>
  <div>
    <h2>Error table component</h2>
    <table>
      <thead>
        <tr>
          <th>Message</th>
          <th>Stack</th>
          <th>Time Stamp</th>
          <th>File Name</th>
          <th>Start Date</th>
          <th>Duration</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="errorPost in errorPosts" :key="errorPost.message">
          <td>{{ errorPost.message }}</td>
          <td>{{ errorPost.stack }}</td>
          <td>{{ errorPost.timeStamp }}</td>
          <td>{{ errorPost.fileName }}</td>
          <td>{{ errorPost.session.startDate }}</td>
          <td>{{ errorPost.session.duration }}</td>
          <td>{{ errorPost.session.url }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  // props: {
  //   errorPosts: {
  //     type: Object,
  //     default: () => {}
  //   }
  // },
  data() {
    return {
      errorPosts: []
    };
  },
  async fetch() {
    this.errorPosts = await fetch(
      "http://localhost:4000/getMonitorError"
    ).then(res => res.json());
  }
};
</script>

<style></style>
