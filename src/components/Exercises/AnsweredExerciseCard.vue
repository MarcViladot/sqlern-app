<template>
  <v-card class="card">
      <ul>
        <li>id: {{exercise.id}}</li>
        <li>statement: {{exercise.exercise.statement}}</li>
        <li>student_solution: {{exercise.answered}}</li>
        <li>teacher_solution: {{exercise.exercise.solution}}</li>
        <li>correct?: {{exercise.correct}}</li>
      </ul>
  </v-card>
</template>

<script>
export default {
  name: "AnsweredExerciseCard",
  props: {
    exercise: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>

</style>