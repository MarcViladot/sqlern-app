<template>
  <div v-if="quizz">
    <h6>{{quizz.name}}</h6>

    <label>Exercises in this Quizz</label>
    <div v-for="exercise in quizz.exercises" :key="exercise.id">
      <v-card class="card">
        <div>
          <p>
            <b>Statement:</b>
            {{exercise.statement}}
          </p>
        </div>
        <div>
          <p>
            <b>Solution:</b>
            {{exercise.solution}}
          </p>
        </div>
      </v-card>
    </div>

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
export default {
  name: "QuizzDetail",
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
          this.$swal(res.code, "Your code", "success");
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
</style>