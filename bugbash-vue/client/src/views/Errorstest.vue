<template>
  <div id="errorstest">
    <h1>Errorstest</h1>
    <router-link to="/">Back to list</router-link>
    <table>
      <tr v-for="(err, index) in errorList" :key="index">
        <td>{{ err.hashNumber }}</td>
        <td>
          <!-- <router-link :to="`/errortest/${err.hashNumber}`">view</router-link> -->
          <router-link :to="{ name: 'err', params: { id: err._id } }"
            >view</router-link
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    errorList() {
      return this.$store.getters.errorsList;
    },
  },
};
</script>

<style></style>
