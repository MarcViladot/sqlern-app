<template>
  <v-app>
    <div v-if="!logged">
      <LoginLayout />
    </div>
    <div v-if="logged">
      <Toolbar/>
      <v-content>
        <HelloWorld/>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import LoginLayout from "./components/Login/LoginLayout.vue";
import Toolbar from "./components/Toolbar.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    HelloWorld,
    LoginLayout,
    Toolbar
  },
  created() {
    this.$store.dispatch("user/setCurrentUser");
  },
  computed: {
    ...mapState({
      logged: state => state.user.isLoggedIn,
      user: state => state.user.currentUser
    })
  },
  data() {
    return {

    };
  }
};
</script>
