<template>
  <div>
    <v-toolbar dense color="primary" style="color: white">
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light pointer" v-on:click="home">Sqlearn</span>
      </v-toolbar-title>
      <span class="buttons" v-if="isTeacher()">
        <v-btn flat to="/search/quizzs" class="btn" style="color: white">Search Quizzes</v-btn>
      </span>
      <span class="buttons" v-else>
        <v-btn flat v-on:click="dialogExercises = true" style="color: white">Practice exercises</v-btn>
      </span>
      <v-spacer></v-spacer>
      <span v-if="!isTeacher()">
        <v-text-field
          hide-details
          label="Join Quiz"
          append-icon="arrow_forward"
          @click:append="goToQuizz"
          solo
          class="mx-3"
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
          <span v-if="isTeacher()">
            <v-divider></v-divider>
            <v-list-tile to="/tables/new">Execute SQL Script</v-list-tile>
          </span>
          <v-divider></v-divider>
          <v-list-tile v-on:click="logout">Logout</v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-dialog v-model="dialog" width="500">
      <v-card class="dialog">
        <NewModelForm v-on:uploaded="dialog = false"/>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogExercises" width="500">
      <v-card class="cardd">
        <SelectionMode v-on:selected="dialogExercises = false"/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import NewModelForm from "./conceptualmodels/NewModelForm.vue";
import SelectionMode from "./exercises/SelectionMode.vue";
import quizzs from "../api/quizzs";
export default {
  name: "Toolbar",
  components: {
    NewModelForm,
    SelectionMode
  },
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
      quizzs
        .isAnswered(this.code)
        .then(result => {
          if (!result) {
            this.$router.push("/quizzs/test/" + this.code);
          } else {
            this.$swal({
              title: "Quiz already answered",
              text: "You already answered this Quizz",
              type: "info"
            });
          }
        })
        .catch(err => {});
    },
    home() {
      this.$router.push("/");
    }
  },
  data() {
    return {
      code: "",
      dialog: false,
      dialogExercises: false
    };
  }
};
</script>

<style lang="scss">
#btn-menu {
  color: white;
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
.dialog {
  margin: 0;
  padding: 10px;
}
.v-toolbar--dense .v-input__control {
  min-height: 38px !important;
  width: 150px !important;
}
.cardd {
  margin: 0;
  padding: 10px;
  min-height: 175px;
}
</style>