<template>
  <div>
    <NewQuizzForm/>
  </div>
</template>

<script>
import NewExerciseForm from "./exercises/NewExerciseForm.vue";
import AnswerExerciseForm from "./exercises/AnswerExerciseForm.vue";
import NewModelForm from "./conceptualmodels/NewModelForm.vue";
import NewQuizzForm from "./quizzs/NewQuizzForm.vue";
export default {
  components: {
    NewExerciseForm,
    NewModelForm,
    AnswerExerciseForm,
    NewQuizzForm
  },
  methods: {
    showAlert() {
      this.$swal("NSA#WE", "Your code", "success");
    }
  }
};
</script>

<style>
</style>
