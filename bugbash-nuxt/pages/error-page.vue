<template>
  <div>
    <div>
      <h2>Throw testing</h2>
      <p>Please input a number between 5 and 10:</p>

      <input id="demo" type="text" v-model="x" />
      <button type="button" @click="errorMethod">Test Input</button>
      {{ msg }}
    </div>
    <br>
    <div>
        <h2>Name and message testing</h2>
        <p>Push the button</p>
        <button type="button" @click="nameAndMessage">Push</button>
        <p>Error type</p>
        {{ name }}
        <p>Error Message</p>
        {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: null,
      x: null,
      name: null,
      message: null
    };
  },

  methods: {
    errorMethod() {
      try {
        if (this.x == "") throw "empty";
        if (isNaN(this.x)) throw "not a number";
        this.x = Number(this.x);
        if (this.x < 5) throw "too low";
        if (this.x > 10) throw "too high";
      } catch (err) {
        this.msg = "Input is " + err;
      }
    },
    nameAndMessage() {
        try {
            let nr = 5;
            console.log(5 + notAnything);
        }
        catch(err) {
            this.name = err.name;
            this.message = err.message;
        }
    }
  },
};
</script>

<style>
</style>