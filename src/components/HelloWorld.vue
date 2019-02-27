<template>
  <div></div>
</template>

<script>
import NewExerciseForm from "./exercises/NewExerciseForm.vue";
import AnswerExerciseForm from "./exercises/AnswerExerciseForm.vue";
import NewModelForm from "./conceptualmodels/NewModelForm.vue";
import NewQuizzForm from "./quizzs/NewQuizzForm.vue";
import exercises from "../api/exercises";
export default {
  components: {
    NewExerciseForm,
    NewModelForm,
    AnswerExerciseForm,
    NewQuizzForm
  },
  data() {
    return {
      exercises: []
    };
  },
  methods: {},
  created() {
  }
};
</script>

<style>
</style>
