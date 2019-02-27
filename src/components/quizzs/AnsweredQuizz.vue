<template>
  <div v-if="answeredQuizz">
    <div>
      <v-card class="card">
        <h4>Quizz {{answeredQuizz.id}}</h4>
        <div>
          <p>
            <b>Number of exercises:</b>
            {{answeredQuizz.exercises.length}}
          </p>
          <p>
            <b>Correct exercises:</b>
            {{answeredQuizz.note}}
          </p>
          <div class="float-left">
            <b>Note:</b>&nbsp;
            <span
              v-bind:style="[calculateNote() >= 5 ? {color: 'green'} : {color: 'red'}]"
            >{{calculateNote()}}/10</span>
          </div>
          <div class="float-right">
            <small
              id="date"
            >Answered at {{moment(answeredQuizz.created_at).format('DD-MM-YYYY hh:mm:ss')}}</small>
          </div>
        </div>
      </v-card>
    </div>
    <div v-for="exercise in answeredQuizz.exercises" :key="exercise.id">
      <AnsweredExerciseCard :exercise="exercise"/>
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

<style lang="scss">
#date {
  color: gray;
}
</style>