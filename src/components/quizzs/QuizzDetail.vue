<template>
  <div v-if="quizz">
    <div>
      <v-card class="card">
        <h4>
          Quiz {{quizz.name}} - By
          <b>{{quizz.user.last_name}}, {{quizz.user.name}}</b>
        </h4>
        <div>
          <div style="margin-bottom: 5px">
            <b>Number of exercises:</b>
            {{quizz.exercises.length}}
          </div>
          <div>
            <span v-for="(topic, index) in quizz.topics" :key="topic.id">
              <!-- <span>{{topic.name}}</span>
              <span v-if="index+1 < quizz.topics.length">,&nbsp;</span>
              <span v-else>.</span>-->
              <v-chip color="indigo" style="color: white" disabled>{{topic.name}}</v-chip>
            </span>
          </div>
          <div class="float-right">
            <small id="date">Created at {{moment(quizz.created_at).format('DD-MM-YYYY hh:mm:ss')}}</small>
          </div>
        </div>
      </v-card>
    </div>

    <v-expansion-panel>
      <v-expansion-panel-content v-for="(exercise, index) in quizz.exercises" :key="index">
        <div slot="header">Exercise {{index+1}}</div>
        <ExerciseDisplay :exercise="exercise" style="margin-left: 15px"/>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <div>
      <v-btn
        class="float-right"
        color="primary"
        v-on:click="generate"
        :disabled="quizz.generated"
      >Generate Code</v-btn>
    </div>
  </div>
</template>

<script>
import quizzs from "../../api/quizzs";
import ExerciseDisplay from "../exercises/ExerciseDisplay.vue";
export default {
  name: "QuizzDetail",
  components: {
    ExerciseDisplay
  },
  data() {
    return {
      id: this.$route.params.id,
      quizz: undefined
    };
  },
  created() {
    quizzs
      .getById(this.id)
      .then(res => {
        this.quizz = res;
      })
      .catch(error => console.log(error.response));
  },
  methods: {
    generate() {
      quizzs
        .generateQuizz(this.id)
        .then(res => {
          this.$swal(res.code, "Is your code for this Quizz", "success");
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>

<style lang="scss">
.card {
  padding: 10px;
  margin-bottom: 15px;
}
#date {
  color: gray;
}
</style>