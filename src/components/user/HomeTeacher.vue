<template>
  <div class="col-lg-12">
    <v-layout row>
      <div class="col">
        <v-card class="card">
          <QuizzsChart/>
        </v-card>
      </div>
      <div class="col">
        <v-card class="card">
          <LastQuizzChart/>
        </v-card>
      </div>
    </v-layout>

    <v-layout row>
      <div class="col">
        <v-card class="card">
          <GQuizzsChart/>
        </v-card>
      </div>
      <div class="col">
        <v-card class="table-card">
          <h5 class="float-left">My Exercises</h5>
          <v-btn flat icon to="/exercises/new" class="float-right" color="primary">
            <v-icon>add</v-icon>
          </v-btn>
          <v-data-table :headers="headersExercises" :items="user.exercises" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="pointer" v-on:click="setExercise(props.item)">{{ props.item.id }}</td>
              <td class="text-xs-left">
                <span v-for="(topic, index) in props.item.topics" :key="topic.id">
                  <span>{{topic.name}}</span>
                  <span v-if="index+1 < props.item.topics.length">,&nbsp;</span>
                </span>
              </td>
              <td>
                <v-btn flat icon v-on:click="editExercise(props.item)">
                  <v-icon>tune</v-icon>
                </v-btn>
              </td>
              <td>{{ moment(props.item.created_at).format('DD-MM-YYYY hh:mm') }}</td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LastQuizzChart from "./charts/LastQuizzChart.vue";
import QuizzsChart from "./charts/QuizzsChart.vue";
import GQuizzsChart from "./charts/GQuizzsChart.vue";
export default {
  name: "HomeTeacher",
  components: {
    LastQuizzChart,
    QuizzsChart,
    GQuizzsChart
  },
  data() {
    return {
      headersExercises: [
        { text: "ID", sortable: false },
        { text: "Topics", sortable: false },
        { text: "Edit", sortable: false },
        { text: "Created at", value: "created_at" }
      ]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  }
};
</script>

<style lang="scss" scoped>
</style>
