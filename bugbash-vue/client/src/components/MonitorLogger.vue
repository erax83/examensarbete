<template>
  <div class="monitor-viewer">
    <h1>Logged errors</h1>

    <table style="width:100%">
      <tr>
        <th>Blank</th>
        <th v-if="$store.state.idState == true">ID</th>
        <th v-if="$store.state.dateState == true">Date</th>
        <th v-if="$store.state.messageState == true">Message</th>
        <th v-if="$store.state.urlState == true">Url</th>
      </tr>
      <tr
        v-for="(error, index) in $store.getters.errors"
        v-bind:key="index"
        :class="{ active: index === activeItem }"
      >
        <td>
          <button @click="moreInfo(error)">
            Show more info
          </button>
        </td>
        <td v-if="$store.state.idState == true">{{ error._id }}</td>
        <td v-if="$store.state.dateState == true">
          {{ new Date(error.timeStamp).toLocaleString() }}
        </td>
        <td v-if="$store.state.messageState == true">{{ error.message }}</td>
        <td v-if="$store.state.urlState == true">
          <a :href="error.session.url" target="_blank">{{
            error.session.url.substring(7)
          }}</a>
        </td>
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
