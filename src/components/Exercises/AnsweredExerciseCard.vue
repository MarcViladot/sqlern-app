<template>
  <v-card class="card">
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">Conceptual Model</div>
        <v-card>
          <img v-bind:src="exercise.exercise.conceptualmodel.url" class="img">
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <br>
    <div class="p">
      <h5>Statement:</h5>
      {{exercise.exercise.statement}}
    </div>
    <div class="p">
      <h5>Teacher Solution:</h5>
      <span>{{exercise.exercise.solution}}</span>
    </div>
    <div class="p">
      <h5>Answered:</h5>
      <span
        v-bind:style="[exercise.correct ? {color: 'green'} : {color: 'red'}]"
      >{{exercise.answered}}</span>
    </div>
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
.p {
  margin-bottom: 15px;
}
.img {
  margin-left: 15px;
}
</style>