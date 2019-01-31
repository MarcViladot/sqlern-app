<template>
  <v-toolbar dense>
    <v-toolbar-title class="headline text-uppercase">
      <span class="font-weight-light">Sqlern</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu bottom origin="center center" transition="scale-transition">
      <v-btn flat slot="activator">
        <span class="mr-2">{{user.name}} {{user.last_name}}</span>
        <v-icon>keyboard_arrow_down</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-on:click="logout">Logout</v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    }
  }
};
</script>

<style scoped>
</style>