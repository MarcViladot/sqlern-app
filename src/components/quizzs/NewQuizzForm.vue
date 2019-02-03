<template>
  <div>
    <v-dialog v-if="exercise" v-model="dialog" width="500">
      <v-card class="card">
        <div>
          <label>
            <b>Statement</b>
          </label>
          <p>{{exercise.statement}}</p>
        </div>
        <div>
          <label>
            <b>Solution</b>
          </label>
          <p>{{exercise.solution}}</p>
        </div>
      </v-card>
    </v-dialog>

    <h3>Create Quizz</h3>
    <div class="row">
      <v-text-field label="Quizz name" v-model="name" class="col"></v-text-field>
      <v-checkbox label="This Quizz is private" v-model="privat" class="col" color="primary"></v-checkbox>
    </div>

    <h5>Available Exercices to add</h5>
    <div class="row">
      <div class="col">
        <label>My Exercises</label>
        <v-data-table :headers="headers" :items="user.exercises" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>
              <span v-on:click="setExercise(props.item)" class="view">Preview</span>
            </td>
            <td class="text-xs-left">
              <span v-for="(topic, index) in props.item.topics" :key="topic.id">
                <span>{{topic.name}}</span>
                <span v-if="index+1 < props.item.topics.length">,&nbsp;</span>
              </span>
            </td>
            <td>
              <v-icon v-if="!isAdded(props.item)" v-on:click="addExercise(props.item)">add</v-icon>
              <v-icon v-else>done</v-icon>
            </td>
          </template>
        </v-data-table>
      </div>

      <div class="col">
        <label>Public Exercises</label>
        <v-data-table :headers="headersPublic" :items="exercises" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>
              <span v-on:click="setExercise(props.item)" class="view">Preview</span>
            </td>
            <td class="text-xs-left">
              <span v-for="(topic, index) in props.item.topics" :key="topic.id">
                <span>{{topic.name}}</span>
                <span v-if="index+1 < props.item.topics.length">,&nbsp;</span>
              </span>
            </td>
            <td class="text-xs-left">{{ props.item.user.name}} {{ props.item.user.last_name}}</td>
            <td>
              <v-icon v-if="!isAdded(props.item)" v-on:click="addExercise(props.item)">add</v-icon>
              <v-icon v-else>done</v-icon>
            </td>
          </template>
        </v-data-table>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label>Quizz Exercises</label>
        <v-data-table :headers="headersQuizz" :items="addedsExercices" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>
              <span v-on:click="setExercise(props.item)" class="view">Preview</span>
            </td>
            <td class="text-xs-left">
              <span v-for="(topic, index) in props.item.topics" :key="topic.id">
                <span>{{topic.name}}</span>
                <span v-if="index+1 < props.item.topics.length">,&nbsp;</span>
              </span>
            </td>
            <td class="text-xs-left">{{ props.item.user.name}} {{ props.item.user.last_name}}</td>
            <td>
              <v-icon v-on:click="removeExercise(props.item.id)">clear</v-icon>
            </td>
          </template>
        </v-data-table>
      </div>

      <div class="col topics">
        <label>Topics</label>
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
        <v-btn color="primary" v-on:click="createQuizz" id="create">Create Quizz</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import exercises from "../../api/exercises";
import { mapState } from "vuex";
export default {
  name: "NewQuizzForm",
  data() {
    return {
      dialog: false,
      exercise: undefined,
      headersPublic: [
        { text: "View", sortable: false },
        { text: "Topics", sortable: false },
        { text: "User", sortable: false },
        { text: "Add To Quizz", sortable: false }
      ],
      headersQuizz: [
        { text: "View", sortable: false },
        { text: "Topics", sortable: false },
        { text: "User", sortable: false },
        { text: "Remove", sortable: false }
      ],
      headers: [
        { text: "View", sortable: false },
        { text: "Topics", sortable: false },
        { text: "Add To Quizz", sortable: false }
      ],
      exercises: [],
      checkedTopics: [""],
      addedsExercices: [],
      name: "",
      privat: false
    };
  },
  computed: {
    ...mapState({
      topics: state => state.topic.all,
      user: state => state.user.currentUser
    })
  },
  methods: {
    loadExercises() {
      const topics = this.checkedTopics.join("+");
      exercises
        .getSet(topics, 0)
        .then(res => {
          this.exercises = res;
        })
        .catch(error => console.log(error.response));
    },
    addExercise(exercise) {
      this.addedsExercices.push(exercise);
    },
    isAdded(exercise) {
      return this.addedsExercices.includes(exercise);
    },
    removeExercise(id) {
      this.addedsExercices = this.addedsExercices.filter(e => e.id != id);
    },
    setExercise(exercise) {
      this.dialog = true;
      this.exercise = exercise;
    },
    createQuizz() {
      const data = {
        data: {
          name: this.name,
          public: !this.private,
          topics: this.checkedTopics
        },
        exercises: this.addedsExercices
      };
      this.$store.dispatch("quizz/create", data);
    }
  }
};
</script>

<style lang="scss">
label {
  font-size: 16px;
}
.container {
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(auto-fit, 120px);
  grid-template-rows: repeat(2, 30px);
}
#create {
  margin-top: 15px;
  width: 100%;
}

.topics {
  display: flex;
  flex-direction: column;
  button {
    margin-top: auto;
  }
}

.view {
  cursor: pointer;
}

.card {
  padding: 10px;
}
</style>