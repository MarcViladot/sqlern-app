<template>
  <v-toolbar dense>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-light">Sqlern</span>
    </v-toolbar-title>
    <v-btn flat>Search Quizzs</v-btn>
    <v-spacer></v-spacer>
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
      return this.user.role == 1;
    },
    logout() {
      this.$store.dispatch("user/logout");
    }
  }
};
</script>

<style lang="scss">
#btn-menu {
  &:focus {
    outline: 0 !important;
  }
}
</style>