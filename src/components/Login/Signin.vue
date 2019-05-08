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
      <v-alert :value="true" color="error" icon="warning" outline v-if="error">Incorrect email or password</v-alert>
    </v-form>
    <v-btn color="primary" v-on:click="login">Sign in</v-btn>
    <div>or</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  computed: {
    ...mapState({
      error: state => state.user.error
    })
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
