<template>
  <div v-if="user">
    <v-dialog v-if="exercise" v-model="dialog" width="500">
      <v-card class="dialog">
        <div>
          <label>
            <b>Statement</b>
          </label>
          <p>{{exercise.statement}}</p>
        </div>
        <div>
          <label>
            <b>Solution:&nbsp;</b>
          </label>
          <p>{{exercise.solution}}</p>
        </div>
      </v-card>
    </v-dialog>

    <div class="row">
      <div class="col">
        <v-card class="card">
          <h5>My Quizzs</h5>
          <v-data-table :headers="headersQuizzs" :items="user.quizzs" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="pointer">{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.public }}</td>
              <td>{{ props.item.gtimes }}</td>
              <td>{{ moment(props.item.created_at).format('DD-MM-YYYY hh:mm') }}</td>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <div class="col">
        <v-card class="card">
          <h5>My Generated Quizzs</h5>
          <v-data-table :headers="headersGQuizzs" :items="user.generatedquizzs" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="pointer">{{ props.item.code }}</td>
              <td>{{ props.item.user.name }} {{ props.item.user.last_name }}</td>
              <td>{{ props.item.answers }}</td>
              <td>{{ moment(props.item.created_at).format('DD-MM-YYYY hh:mm') }}</td>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <v-card class="card">
          <h5>My Exercises</h5>
          <v-data-table :headers="headersExercises" :items="user.exercises" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="pointer" v-on:click="setExercise(props.item)">{{ props.item.id }}</td>
              <td class="text-xs-left">
                <span v-for="(topic, index) in props.item.topics" :key="topic.id">
                  <span>{{topic.name}}</span>
                  <span v-if="index+1 < props.item.topics.length">,&nbsp;</span>
                </span>
              </td>
              <td>{{ moment(props.item.created_at).format('DD-MM-YYYY hh:mm') }}</td>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <div class="col">
        <v-card class="card"></v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TeacherProfile",
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  data() {
    return {
      headersQuizzs: [
        { text: "Quizz ID", sortable: false },
        { text: "Name", sortable: false },
        { text: "Public", sortable: false },
        { text: "Times Generated", value: "gtimes" },
        { text: "Created at", value: "created_at" }
      ],
      headersGQuizzs: [
        { text: "Quizz Code", sortable: false },
        { text: "Made by", sortable: false },
        { text: "Times Answered", value: "answers" },
        { text: "Created at", value: "created_at" }
      ],
      headersExercises: [
        { text: "ID", sortable: false },
        { text: "Topics", sortable: false },
        { text: "Created at", value: "created_at" }
      ],
      exercise: undefined,
      dialog: false
    };
  },
  methods: {
    setExercise(exercise) {
      this.dialog = true;
      this.exercise = exercise;
    }
  }
};
</script>

<style scoped>
.dialog {
  margin: 0;
  padding: 10px;
}
</style>