<template>
  <div v-if="answeredQuizz">
    <h5>Answered Quizz {{answeredQuizz.id}}</h5>
    <div v-for="exercise in answeredQuizz.exercises" :key="exercise.id">
      <AnsweredExerciseCard :exercise="exercise"/>
    </div>
    <div>
      <p>nota total -> {{((this.answeredQuizz.note / this.answeredQuizz.exercises.length) * 10)}}</p>
    </div>
  </div>
</template>

<script>
import quizzs from "../../api/quizzs";
import AnsweredExerciseCard from "../exercises/AnsweredExerciseCard.vue";
export default {
  name: "AnsweredQuizz",
  components: {
    AnsweredExerciseCard
  },
  data() {
    return {
      answeredQuizz: undefined,
      id: this.$route.params.id
    };
  },
  created() {
    quizzs
      .getAnsweredQuizz(this.id)
      .then(res => {
        this.answeredQuizz = res;
      })
      .catch(error => console.log(error));
  },
  methods: {
    calculateNote() {
      return (
        (this.answeredQuizz.note / this.answeredQuizz.exercises.length) * 10
      );
    }
  }
};
</script>

<style scoped>
</style>