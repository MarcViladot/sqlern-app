<template>
  <div>
    <h5>New Conceptual Model</h5>
    <div class="row">
      <div class="col">
        <v-text-field label="Conceptual Model name" v-model="name" :rules="fieldRules"></v-text-field>
      </div>
      <div class="col">
        <input
          type="file"
          class="form-control input"
          accept="image/*"
          v-on:change="changeFile($event.target.files)"
        >
      </div>
    </div>
    <div class="text-xs-right">
      <v-btn color="primary" v-on:click="upload" :disabled="!name || !fileData">Upload</v-btn>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import models from "../../api/models";
export default {
  name: "NewModelForm",
  data: function() {
    return {
      cloudinary: {
        uploadPreset: "xjnzvjk4",
        apiKey: "262829197441322",
        cloudName: "dpsci3hpd"
      },
      fileData: undefined,
      name: "",
      fieldRules: [v => !!v || "Field required"]
    };
  },
  computed: {
    clUrl: function() {
      return (
        "https://api.cloudinary.com/v1_1/" +
        this.cloudinary.cloudName +
        "/upload"
      );
    }
  },
  methods: {
    upload() {
      axios.post(this.clUrl, this.fileData).then(res => {
        models
          .create({ url: res.data.secure_url, name: this.name })
          .then(res => {
            this.$store.dispatch("user/setCurrentUser");
            this.$emit("uploaded");
          })
          .catch(error => console.log(error.response));
      });
    },
    changeFile: function(file) {
      this.fileData = new FormData();
      this.fileData.append("file", file[0]);
      this.fileData.append("upload_preset", this.cloudinary.uploadPreset);
      this.fileData.append("tags", "gs-vue,gs-vue-uploaded");
    }
  }
};
</script>

<style lang="scss">
.input {
  margin-top: 15px;
}
</style>