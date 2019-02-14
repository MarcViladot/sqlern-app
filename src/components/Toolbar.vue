<template>
  <v-toolbar dense>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-light">Sqlearn</span>
    </v-toolbar-title>
    <span class="buttons" v-if="isTeacher()">
      <v-btn flat to="/search/quizzs">Search Quizzs</v-btn>
      <v-btn flat to="/search/exercises">Search Exercises</v-btn>
    </span>
    <v-spacer></v-spacer>
    <span v-if="!isTeacher()" class="search-box row">
      <v-text-field
        hide-details
        label="Join Quizz"
        solo
        single-line
        v-model="code"
        v-on:keyup.enter="goToQuizz"
      ></v-text-field>
    </span>
    <v-menu bottom origin="center center" transition="scale-transition">
      <v-btn flat slot="activator" id="btn-menu">
        <span class="mr-2">{{user.name}} {{user.last_name}}</span>
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile to="/profile">My Profile</v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-on:click="logout">Logout</v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Toolbar",
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  methods: {
    isTeacher() {
      return this.user.role === 1;
    },
    logout() {
      this.$store.dispatch("user/logout");
    },
    goToQuizz() {
      this.$router.push("/quizzs/test/" + this.code);
    }
  },
  data() {
    return {
      code: ""
    };
  }
};
</script>

<style lang="scss">
#btn-menu {
  &:focus {
    outline: 0 !important;
  }
}
.buttons {
  margin-left: 20px;
}
a {
  text-decoration: none !important;
}
</style>