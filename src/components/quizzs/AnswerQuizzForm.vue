<template>
  <div v-if="gquizz">
    <h5>Quizz {{quizz.name}}</h5>
    <div v-for="exercise in quizz.exercises" :key="exercise.id">
      <AnswerExerciseForm :exercise="exercise" v-on:solution="solutionChange" :quizz="true"/>
    </div>
    <div>
      <v-btn class="float-right" color="primary" v-on:click="submitQuizz">Submit Quizz</v-btn>
    </div>
  </div>
</template>

<script>
import quizzs from "../../api/quizzs";
import AnswerExerciseForm from "../exercises/AnswerExerciseForm.vue";
export default {
  name: "AnswerQuizzForm",
  components: {
    AnswerExerciseForm
  },
  data() {
    return {
      code: this.$route.params.code,
      gquizz: undefined,
      quizz: undefined
    };
  },
  created() {
    quizzs
      .getByCode(this.code)
      .then(res => {
        this.gquizz = res;
        this.quizz = res.quizz;
      })
      .catch(error => console.log(error.response));
  },
  methods: {
    submitQuizz() {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#009688",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, send it!"
      }).then(result => {
        if (result.value) {
          var data = [];
          this.quizz.exercises.forEach(e => {
            data.push({
              student_solution: e.student_solution,
              exercise_id: e.id
            });
          });
          quizzs
            .answerQuizz({
              generatedquizz_id: this.gquizz.id,
              exercises: JSON.stringify(data)
            })
            .then(res => {
              this.$router.push("/quizzs/answered/" + res.id);
            })
            .catch(error => console.log(error.response));
        }
      });
    },
    solutionChange(data) {
      this.quizz.exercises.forEach(e => {
        if (e.id === data.exercise_id) {
          e.student_solution = data.solution;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>