<template>
  <v-card class="card" style="background-color: #EEEEF0;">
    <h5>Exercise {{exercise.id}}</h5>
    <v-form v-model="valid" class="fields">
      <div>
        <v-layout row>
          <div id="statement">
            <v-text-field
              label="Solo"
              placeholder="Statement"
              solo
              v-model="exercise.statement"
              :disabled="!edit"
              :rules="statementRules"
              required
            ></v-text-field>
          </div>
          <div>
            <v-checkbox v-model="exercise.public" label="Public" :disabled="!edit" color="primary"></v-checkbox>
          </div>
        </v-layout>
        <v-layout row class="col-lg-12">
          <div class="code-editor">
            <span class="header">
              <v-icon small>code</v-icon>&nbsp;
              <b>Code Editor</b>
            </span>
            <span class="tab"></span>
            <div class="editor">
              <codemirror v-model="exercise.solution" :options="cmOption"></codemirror>
            </div>
          </div>
          <div class="hint">
            <label>Hint</label>
            <v-textarea
              solo
              name="hint"
              class="text"
              label="Hint"
              v-model="hintComputed"
              :disabled="!edit"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
            <v-select
              :items="user.conceptualmodels"
              solo
              label="Conceptual Model"
              v-model="exercise.conceptualmodel"
              :disabled="!edit"
              item-text="name"
              required
              item-value="id"
            ></v-select>
            <v-btn color="secondary" @click="edit = true" v-if="!edit">Edit</v-btn>
            <v-btn
              color="primary"
              v-on:click="saveExercise"
              v-if="edit"
              :disabled="!valid || !exercise.solution || !exercise.conceptualmodel"
              type="submit"
            >Save changes</v-btn>
          </div>
        </v-layout>
      </div>
    </v-form>
  </v-card>
</template>

<script>
import "codemirror/theme/idea.css";
import "codemirror/mode/sql/sql.js";
import exercises from "../../api/exercises";
import { mapState } from "vuex";
export default {
  name: "EditExerciseForm",
  props: {
    exercise: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      edit: false,
      cmOption: {
        tabSize: 3,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-mysql",
        theme: "idea"
      },
      valid: false,
      statementRules: [v => !!v || "Statement is required"],
      solutionRules: [v => !!v || "Solution is required"]
    };
  },
  methods: {
    saveExercise() {
      const data = {
        solution: this.exercise.solution,
        statement: this.exercise.statement,
        conceptualmodel_id: this.exercise.conceptualmodel,
        public: this.exercise.public
      };
      exercises
        .update(this.exercise.id, data)
        .then(res => {
          this.edit = false;
          this.$swal({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            type: "success",
            title: "Saved!",
            text: ""
          });
        })
        .catch(error => console.log(error));
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    }),
    hintComputed: {
      get: function() {
        return this.exercise.comments[0]
          ? this.exercise.comments[0].comment
          : "";
      },
      set: function(newValue) {
        this.exercise.comments[0].comment = newValue;
      }
    }
  }
};
</script>

<style lang="scss">
.editor {
  width: 60%;
  margin-left: 15px;
  margin-right: 20px;
  label {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
.hint {
  width: 35%;
  margin-left: 10px;
  .text {
    width: 100%;
  }
}
#statement {
  width: 60%;
  margin-left: 15px;
  margin-right: 20px;
}
</style>