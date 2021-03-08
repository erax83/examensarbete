<template>
  <div>
    <h1>Upload</h1>
    <form @submit.prevent="sendFile" enctype="multipart/form-data">
        <label for="file" class="label">Upload File</label>
        <input type="file" ref="file" @change="selectFile">
        <div class="field"> 
            <button class="button is-info">Send</button>
        </div>
        <img :src="this.file" alt="test">
    </form>
  </div>
</template>

<script>
export default {
  name: "SimpleUpload",
  data() {
      return {
          file: "",
      }
  },
  methods: {
      selectFile() {
          // this.file = this.$refs.file.files[0];
          this.file = "./assets/bugbashlogo.jpeg";

          this.$store.commit("changeAvatarImage", this.$refs.file.files[0]); 
      }
  }
};
</script>

<style></style>
