<template>
  <div>
    <v-form v-model="valid" class="fields">
      <v-text-field v-model="email" :rules="emailRules" label="Email" required></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show ? 'visibility_off' : 'visibility'"
        :type="show ? 'text' : 'password'"
        :rules="passwordRules"
        label="Password"
        required
        @click:append="show = !show"
      ></v-text-field>
    </v-form>
     <v-btn color="primary" v-on:click="login">Sign in</v-btn>
    <span>or</span>
  </div>
</template>

<script>
export default {
  name: "signin",
  methods: {
    login() {
      this.$store.dispatch("user/login", {
        email: this.email,
        password: this.password
      });
    }
  },
  data: () => ({
    valid: false,
    show: false,
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    email: "tanja@hotmail.com",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  })
};
</script>

<style lang="scss">
</style>
