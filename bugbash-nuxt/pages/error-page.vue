<template>
  <div>
    <div>
      <h2>Throw testing</h2>
      <p>Please input a number between 5 and 10:</p>

      <input id="demo" type="text" v-model="x" />
      <button type="button" @click="errorMethod">Test Input</button>
      {{ msg }}
    </div>
    <br />
    <div>
      <h2>Name and message testing</h2>
      <p>Push the button</p>
      <button type="button" @click="nameAndMessage">Push</button>
      <p>Error type</p>
      {{ name }}
      <p>Error Message</p>
      {{ message }}
    </div>
    <br>
    <div>
      <form action="" method="post" @submit.prevent="submitForm()">
        <div>
          <label for="">Some Error</label>
          <input
            type="text"
            :class="{ 'is-invalid': errors && errors.title }"
            v-model="someError"
          />
          <div class="invalid-feedback" v-if="errors && errors.title">
            {{ errors.someError.msg }}
          </div>
          <p>{{ someError }}</p>
        </div>
        <input type="submit" value="Submit" />
      </form>
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
      message: null,
      errors: null,
      someError: null
    };
  },/*
  beforeMount() {
    const refScript = document.getElementsByTagName("script")[0];
    const rcScript = document.createElement("script");

    rcScript.async = true;
    rcScript.crossOrigin = "anonymous";
    rcScript.src = "/assets/errorMonitor.js/";



    //rcScript.addEventListener("load", onRC);
    refScript.parentNode.insertBefore(rcScript, refScript);
  },
  */
  methods: {
    errorMethod() {
      
        if (this.x == "") throw new Error('empty');
        if (isNaN(this.x)) throw "not a number";
        this.x = Number(this.x);
        if (this.x < 5) throw "too low";
        if (this.x > 10) throw "too high";
    },
    nameAndMessage() {
      
        let nr = 5;
        console.log(5 + notAnything());
        
        this.name = err.name;
        this.message = err.message;
      
    },
    submitForm() {
      console.log('inside submitForm');
      console.log(this.someError);
      this.$axios.post("/server/testErrors", {
          someError: this.someError
        })
        .then(response => {
          console.log('inside response');
          console.log(response);
          
          if (response.data._id) {
           this.$router.push({
             name: "testErrors",
             params: { created: "yes" }
           });
          } 


        })
        .catch(error => {
          console.log('not working');
          console.log(this.someError);
          console.log(error);
          
          // if (error.response.data.errors) {
          //   this.errors = error.response.data.errors;
          // }
          
        });
    }
  }
};
</script>

<style></style>
