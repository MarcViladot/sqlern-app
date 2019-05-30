<template>
  <div v-if="gquizz">
    <h5>Quiz {{code}}</h5>
    <br>
    <div>
      <v-card class="table-card" v-if="gquizz.student_answers.length > 0">
        <h5>Students Answers</h5> 
        <v-data-table :headers="headers" :items="gquizz.student_answers" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td
              class="pointer"
              v-on:click="getAnsweredQuizz(props.item.id)"
            >{{ props.item.user.last_name }}, {{ props.item.user.name }}</td>
            <td
              v-bind:style="[passed(props.item) ? {color: 'green'} : {color: 'red'}]"
            >{{props.item.note }}/{{props.item.length}}</td>
            <td>{{ moment(props.item.created_at).format('DD-MM-YYYY hh:mm') }}</td>
          </template>
        </v-data-table>
      </v-card>
      <div v-else>
        No one has answered this quiz
      </div>
    </div>
    <br>
    <div v-if="aquizz">
      <v-card class="card">
        <AnsweredQuizz :answeredQuizz="aquizz"></AnsweredQuizz>
      </v-card>
    </div>
  </div>
</template>

<script>
import quizzs from "../../api/quizzs";
import AnsweredQuizz from "./AnsweredQuizz.vue";
export default {
  name: "GQuizzDetails",
  components: {
    AnsweredQuizz
  },
  data() {
    return {
      gquizz: undefined,
      aquizz: undefined,
      code: this.$route.params.code,
      headers: [
        { text: "Name", sortable: false },
        { text: "Note", value: "note" },
        { text: "Answered at", value: "created_at" }
      ]
    };
  },
  created() {
    quizzs
      .getByCode(this.code)
      .then(res => {
        this.gquizz = res;
      })
      .catch(error => console.log(error.response));
  },
  methods: {
    getAnsweredQuizz(id) {
      quizzs
        .getAnsweredQuizz(id)
        .then(res => {
          this.aquizz = res;
        })
        .catch(error => console.log(error.response));
    },
    passed(quizz) {
      return (quizz.note / quizz.length) * 10 >= 5;
    }
  }
};
</script>

<style scoped>
</style>