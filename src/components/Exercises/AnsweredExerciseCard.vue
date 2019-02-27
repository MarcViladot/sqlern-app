<template>
  <v-card class="card">
    <h5>Exercise {{exercise.id}}</h5>
    <p>
      <b>Statement:</b>
      {{exercise.exercise.statement}}
    </p>
    <p>
      <b>Answered:</b>
      <br>
      <span v-bind:style="[exercise.correct ? {color: 'green'} : {color: 'red'}]">{{exercise.answered}}</span>
    </p>
    <p>
      <b>Teacher Solution</b>
      <br>
      <span>{{exercise.answered}}</span>
    </p>
    <!-- <ul>
        <li>id: {{exercise.id}}</li>
        <li>statement: {{exercise.exercise.statement}}</li>
        <li>student_solution: {{exercise.answered}}</li>
        <li>teacher_solution: {{exercise.exercise.solution}}</li>
        <li>correct?: {{exercise.correct}}</li>
    </ul>-->
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