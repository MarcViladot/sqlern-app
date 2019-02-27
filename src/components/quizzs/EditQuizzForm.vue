<template>
  <div v-if="quizz">
    <v-card class="card">
      <h4>Quizz {{quizz.id}}</h4>
      <v-layout row>
        <div id="name">
          <v-text-field label="Solo" placeholder="Statement" solo v-model="quizz.name"></v-text-field>
        </div>
        <v-checkbox v-model="quizz.public" label="Public" color="primary"></v-checkbox>
      </v-layout>
      <v-btn color="primary" v-on:click="saveQuizz">Save changes</v-btn>
    </v-card>
    <div>
      <div v-for="exercise in quizz.exercises" :key="exercise.id">
        <EditExerciseForm :exercise="exercise"/>
      </div>
    </div>
  </div>
</template>

<script>
import quizzs from "../../api/quizzs";
import EditExerciseForm from "../exercises/EditExerciseForm.vue";
export default {
  name: "EditQuizzForm",
  components: {
    EditExerciseForm
  },
  data() {
    return {
      quizz: undefined,
      id: this.$route.params.id
    };
  },
  methods: {
    saveQuizz() {
      const data = {
        name: this.quizz.name,
        public: this.quizz.public
      };
      quizzs
        .update(this.quizz.id, data)
        .then(res => {
          this.edit = false;
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "Saved!",
            text: ""
          });
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    quizzs
      .getById(this.id)
      .then(res => {
        this.quizz = res;
      })
      .catch(error => console.log(error));
  }
};
</script>

<style lang="scss">
#name {
  width: 60%;
  margin-left: 15px;
  margin-right: 20px;
}
</style>