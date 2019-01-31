<template>
  <div class="background">
    <v-card class="login-card">
      <h2>Sqlern</h2>
      <div class="form">
        <Signin v-if="!signup"/>
        <Signup v-if="signup"/>
        <v-btn color="secondary" v-on:click="signup = !signup">
          <span v-if="!signup">Create an Account</span>
          <span v-if="signup">Back to Sign in</span>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";
export default {
  name: "LoginLayout",
  components: {
    Signin,
    Signup
  },
  data: () => ({
    signup: false
  })
};
</script>

<style lang="scss">
.background {
  background-color: #d3d3d3;
  height: 100%;
}
.login-card {
  min-width: 300px;
  min-height: 300px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px !important;
}
.form {
  margin-top: 25px;
  button {
    width: 90%;
    margin-bottom: 10px;
    margin-top: 10px;
  }

}
</style>