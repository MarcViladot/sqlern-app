<template>
  <div>
    <h4>Exercise {{i+1}} of {{exercises.length}}</h4>
    <div v-for="(exercise, index) in exercises" :key="exercise.id">
      <div v-if="index === i">
        <AnswerExerciseForm :exercise="exercise" :quizz="false" v-on:next="next()"/>
      </div>
    </div>
  </div>
</template>

<script>
import AnswerExerciseForm from "./AnswerExerciseForm.vue";
import { mapState } from "vuex";
import exercises from "../../api/exercises";
export default {
  name: "ExercisesSet",
  components: {
    AnswerExerciseForm
  },
  data() {
    return {
      i: 0
    };
  },
  computed: {
    ...mapState({
      exercises: state => state.exercise.set
    })
  },
  beforeUpdate() {
    console.log(this.exercises.length == 0);
    if (this.exercises.length == 0) {
    }
  },
  methods: {
    next() {
      if (this.i + 1 === this.exercises.length) {
        this.$router.push("/");
      } else {
        this.i += 1;
      }
    }
  }
};
</script>

<style scoped>
</style>