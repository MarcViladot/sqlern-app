<template>
  <div>
    <div>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Topics</div>
          <v-card>
            <v-card-text>
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
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>

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
      quizzs: []
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
        .getByTopics(topics)
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
  grid-template-columns: repeat(auto-fit, 120px);
  grid-template-rows: repeat(2, 30px);
}
</style>