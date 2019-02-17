<template>
  <v-app>
    <div v-if="!logged">
      <LoginLayout/>
    </div>
    <div v-if="logged && user">
      <Toolbar/>
      <v-content>
        <div class="col-lg-12">
          <br>
          <router-view></router-view>
        </div>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import LoginLayout from "./components/login/LoginLayout.vue";
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
    this.$store.dispatch("topic/getAll");
    this.$store.dispatch("user/setCurrentUser");
  },
  computed: {
    ...mapState({
      logged: state => state.user.isLoggedIn,
      user: state => state.user.currentUser
    })
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
hr {
  margin: 0;
}
.card {
  padding: 10px;
}
.pointer {
  cursor: pointer;
}

.table-card {
  padding: 0;
  h5 {
    padding-top: 10px;
    padding-left: 10px;
  }
}
</style>
