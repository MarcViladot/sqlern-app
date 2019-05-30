<template>
  <div>
    <div>
      <v-card>
        <v-card-text>
          <label>Quiz Name</label>
          <v-text-field
            placeholder="Quiz name"
            solo
            class="search-name"
            append-icon="search"
            v-model="name"
            v-on:change="loadExercises"
          ></v-text-field>

          <div class="topics">
            <label>Quiz Topics</label>
            <div class="container">
              <div v-for="(topic, index) in topics" :key="topic.id">
                <v-checkbox
                  style="height: min-content"
                  :label="topic.name"
                  color="primary"
                  v-model="checkedTopics[index]"
                  :value="topic.name"
                  v-on:change="loadExercises"
                ></v-checkbox>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <br>
    <div class="row">
      <div v-for="quizz in quizzs" :key="quizz.id" class="col">
        <QuizzCard :quizz="quizz"/>
      </div>
    </div>
  </div>
</template>

<script>
import quizzs from "../../api/quizzs";
import { mapState } from "vuex";
import exercises from "../../api/exercises";
import QuizzCard from "../quizzs/QuizzCard.vue";
export default {
  name: "SearchQuizzs",
  components: {
    QuizzCard
  },
  data() {
    return {
      checkedTopics: [""],
      quizzs: [],
      name: ""
    };
  },
  computed: {
    ...mapState({
      topics: state => state.topic.all
    })
  },
  methods: {
    loadExercises() {
      const topics = this.checkedTopics.join("+");
      quizzs
        .getByTopics(topics || "''", this.name)
        .then(res => {
          this.quizzs = res;
        })
        .catch(error => console.log(error.response));
    }
  }
};
</script>

<style lang="scss">
.container {
  display: grid;
  grid-gap: 5px;
  padding: 0;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-template-rows: repeat(2, 30px);
}
.search-name {
  width: 30%;
}
</style>