<template>
  <div v-if="user">
    <div class="row">
      <div class="col">
        <v-card class="table-card">
          <h5>My Answered Quizzs</h5>
          <v-data-table :headers="headersQuizzs" :items="user.quizzs" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="pointer" v-on:click="goToQuizz(props.item.id)">{{ props.item.gquizz.code }}</td>
              <td
                v-bind:style="[passed(props.item) ? {color: 'green'} : {color: 'red'}]"
              >{{props.item.note }}/{{props.item.length}}</td>
              <td>{{ props.item.gquizz.user.name }} {{ props.item.gquizz.user.last_name }}</td>
              <td>{{ moment(props.item.created_at).format('DD-MM-YYYY hh:mm') }}</td>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <div class="col">
        <v-card class="table-card">
          <h5>My Answered Exercises</h5>
          <v-data-table :headers="headersExercises" :items="user.exercises" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="pointer">{{ props.item.id }}</td>
              <td v-bind:style="[props.item.correct ? {color: 'green'} : {color: 'red'}]">{{ props.item.correct ? 'Yes' : 'No' }}</td>
              <td>{{ props.item.exercise.user.name }} {{ props.item.exercise.user.last_name }}</td>
              <td>{{ moment(props.item.created_at).format('DD-MM-YYYY HH:MM') }}</td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "StudentProfile",
  data() {
    return {
      headersQuizzs: [
        { text: "Quizz Code", sortable: false },
        { text: "Correct Answers", value: "note" },
        { text: "Teacher", sortable: false },
        { text: "Answered at", value: "created_at" }
      ],
      headersExercises: [
        { text: "ID", sortable: false },
        { text: "Correct?", value: "correct" },
        { text: "Made by", sortable: false },
        { text: "Answered at", value: "created_at" }
      ]
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  methods: {
    goToQuizz(id) {
      this.$router.push("/quizzs/answered/" + id);
    },
    passed(quizz) {
      return (quizz.note / quizz.length) * 10 >= 5;
    }
  }
};
</script>

<style scoped>
</style>