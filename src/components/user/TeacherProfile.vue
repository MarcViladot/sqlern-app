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

    <v-dialog v-if="url.length > 0" v-model="dialogM" width="auto">
      <v-card class="dialog">
        <img v-bind:src="url">
      </v-card>
    </v-dialog>

    <v-dialog v-if="exercise" v-model="dialogExercise" width="auto"> 
      <EditExerciseForm :exercise="exercise" />
    </v-dialog>

    <v-dialog v-model="dialogNewModel" width="500">
      <v-card class="dialog">
        <NewModelForm v-on:uploaded="dialogNewModel = false"/>
      </v-card>
    </v-dialog>

    <div class="row">
      <div class="col">
        <v-card class="table-card">
          <h5 class="float-left">My Quizzs</h5>
          <v-btn flat icon to="/quizzs/new" class="float-right" color="primary">
            <v-icon>add</v-icon>
          </v-btn>
          <v-data-table :headers="headersQuizzs" :items="user.quizzs" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>
                <span :to="'/quizzs/' + props.item.id" class="pointer">{{ props.item.name }}</span>
              </td>
              <td>{{ props.item.public }}</td>
              <td>{{ props.item.gtimes }}</td>
              <td>{{ moment(props.item.created_at).format('DD-MM-YYYY hh:mm') }}</td>
              <td>
                <v-btn flat icon :to="'/quizzs/edit/' + props.item.id">
                  <v-icon>tune</v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn flat icon v-on:click="deleteQuizz(props.item.id)">
                  <v-icon>delete_outline</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <div class="col">
        <v-card class="table-card">
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

      <div class="col">
        <v-card class="table-card">
          <h5 class="float-left">My Conceptual Models</h5>
          <v-btn flat icon class="float-right" v-on:click="dialogNewModel = true" color="primary">
            <v-icon>add</v-icon>
          </v-btn>
          <v-data-table :headers="headersModels" :items="user.conceptualmodels" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="pointer" v-on:click="setModel(props.item.url)">Preview</td>
              <td>{{ moment(props.item.created_at).format('DD-MM-YYYY hh:mm') }}</td>
              <td>
                <v-btn flat icon v-on:click="deleteModel(props.item.id)">
                  <v-icon>delete_outline</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card>
      </div>

      <div class="col">
        <v-card class="table-card"></v-card>
      </div>
    </div>
  </div>
</template>

<script>
import models from "../../api/models";
import quizzs from "../../api/quizzs";
import NewModelForm from "../conceptualmodels/NewModelForm.vue";
import EditExerciseForm from "../exercises/EditExerciseForm.vue";
import { mapState } from "vuex";
export default {
  name: "TeacherProfile",
  components: {
    NewModelForm,
    EditExerciseForm
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  data() {
    return {
      headersQuizzs: [
        { text: "Name", sortable: false },
        { text: "Public", sortable: false },
        { text: "Times Generated", value: "gtimes" },
        { text: "Created at", value: "created_at" },
        { text: "Edit", sortable: false },
        { text: "Remove", sortable: false }
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
        { text: "Edit", sortable: false },
        { text: "Created at", value: "created_at" }
      ],
      headersModels: [
        { text: "Name", sortable: false },
        { text: "Model", sortable: false },
        { text: "Created at", value: "created_at" },
        { text: "Remove", sortable: false }
      ],
      exercise: undefined,
      url: "",
      dialog: false,
      dialogM: false,
      dialogNewModel: false,
      dialogExercise: false
    };
  },
  methods: {
    setExercise(exercise) {
      this.dialog = true;
      this.exercise = exercise;
    },
    setModel(url) {
      this.dialogM = true;
      this.url = url;
    },
    editExercise(exercise){
      this.exercise = exercise;
      this.dialogExercise = true;
    },
    deleteModel(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#009688",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          models
            .delete(id)
            .then(res => {
              this.deleted();
              this.setUser();
            })
            .catch(error => console.log(error));
        }
      });
    },
    deleteQuizz(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#009688",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          quizzs
            .delete(id)
            .then(res => {
              this.deleted();
              this.setUser();
            })
            .catch(error => console.log(error));
        }
      });
    },
    setUser() {
      this.$store.dispatch("user/setCurrentUser");
    },
    deleted() {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        type: "success",
        title: "Deleted!",
        text: ""
      });
    }
  }
};
</script>

<style lang="scss">
.dialog {
  margin: 0;
  padding: 10px;
}
</style>