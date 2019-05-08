<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header">Conceptual Model</div>
        <v-card>
          <img v-bind:src="exercise.conceptualmodel.url" class="img">
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <br>
    <div class="p">
      <h5>Statement:</h5>
      {{exercise.statement}}
    </div>
    <div class="p">
      <h5>Teacher Solution:</h5>
      {{exercise.solution}}
    </div>
    <div class="p">
      <h5>Topics:</h5>
      <span v-for="(topic, index) in exercise.topics" :key="topic.id">
        <span>{{topic.name}}</span>
        <span v-if="index+1 < exercise.topics.length">,&nbsp;</span>
        <span v-else>.</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExerciseDisplay",
  props: {
    exercise: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.p {
  margin-bottom: 15px;
}
</style>