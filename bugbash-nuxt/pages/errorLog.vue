<template>
  <div>
    <h1 class="title">
      Error Log
    </h1>
    <nuxt-link to="/">Home</nuxt-link>
    <!-- <ErrorTable :errorPosts="errorPosts" /> -->
    <ErrorTable />
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     errorPosts: []
  //   };
  // },
  // async fetch() {
  //   this.errorPosts = await fetch(
  //     "http://localhost:4000/getMonitorError"
  //   ).then(res => res.json());
  // },
  
}

</script>

<style></style>
