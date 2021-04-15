<template>
  <div>
      <h1>About</h1>
      <div>{{counter}}</div>
      <button v-on:click="counter++">Press</button>
  </div>
</template>

<script>

export default {
name: "About",
data: () =>({
  counter: 0,
}), 
methods: {
}
}
</script>

<style scoped>

</style>