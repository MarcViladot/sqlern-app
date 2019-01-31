<template>
  <div>
    <v-form v-model="valid" class="fields" v-if="!alert">
      <v-text-field v-model="name" label="First Name" required></v-text-field>
      <v-text-field v-model="lastname" label="Last Name" required></v-text-field>
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
      <v-checkbox v-model="teacher" label="I'm a teacher" color="primary"></v-checkbox>
      <v-btn color="primary" v-on:click="signup">Sign up</v-btn>
    </v-form>
    <v-alert
      :value="true"
      color="success"
      icon="check_circle"
      outline
      v-if="alert"
    >Please confirm your email</v-alert>
  </div>
</template>

<script>
import users from "../../api/users";
export default {
  name: "signup",
  data: () => ({
    valid: false,
    show: false,
    password: "",
    name: "",
    lastname: "",
    teacher: false,
    passwordRules: [v => !!v || "Password is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    alert: false
  }),
  methods: {
    signup() {
      const data = {
        name: this.name,
        last_name: this.lastname,
        email: this.email,
        password: this.password,
        password_confirmation: this.password,
        role: this.teacher ? 1 : 0
      };
      users.signup(data)
        .then(res => {
          this.alert = true;
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style scoped>
</style>