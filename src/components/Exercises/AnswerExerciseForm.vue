<template>
  <v-card class="card">
    <h4>Exercise 1</h4>
    <br>
    <div>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Conceptual Model</div>
          <v-card>
            <img v-bind:src="exercise.conceptualmodel.url">
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>
    <br>
    <div>
      <p>
        <b>Statement:</b>
        {{exercise.statement}}
      </p>
    </div>
    <br>
    <div>
      <v-card class="editor">
        <p>
          <b>Code Editor</b>
          <span class="float-right" v-if="exercise.comments.length > 0 && !quizz">
            <v-tooltip bottom>
              <template #activator="data">
                <v-icon
                  v-on="data.on"
                  slot="activator"
                  id="hint"
                  v-on:click="hint = true"
                >wb_incandescent</v-icon>
              </template>
              <span>Show hint</span>
            </v-tooltip>
          </span>
        </p>
        <codemirror
          v-model="solution"
          :options="cmOption"
          id="codemirror"
          v-on:input="solutionChanged"
        ></codemirror>
      </v-card>
      <span v-if="hint">
        <b>Hint:</b>
        &nbsp;
        {{exercise.comments[0].comment}}
      </span>
    </div>
    <br>
    <div v-if="!quizz">
      <span class="float-left" v-if="correct !== undefined">
        <span v-if="correct">correct</span>
        <span v-else>false - {{exercise.solution}}</span>
      </span>
      <v-btn
        color="primary"
        class="float-right"
        v-on:click="checkExercise"
        :disabled="answered"
      >Check</v-btn>
    </div>
  </v-card>
</template>

<script>
import exercises from "../../api/exercises";
import "codemirror/theme/base16-light.css";
import "codemirror/mode/sql/sql.js";
export default {
  name: "AnswerExerciseForm",
  props: {
    exercise: {
      type: Object,
      required: true
    },
    quizz: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      data: "",
      hint: false,
      cmOption: {
        tabSize: 3,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-mysql",
        theme: "base16-light"
      },
      solution: "",
      teacherSolution: "",
      correct: undefined,
      answered: false
    };
  },
  methods: {
    checkExercise() {
      const data = {
        exercise_id: this.exercise.id,
        student_solution: this.solution
      };
      exercises
        .checkExercise(data)
        .then(res => {
          this.answered = true;
          this.correct = res.correct;
        })
        .catch(error => console.log(error.response));
    },
    solutionChanged() {
      this.$emit("solution", {
        solution: this.solution,
        exercise_id: this.exercise.id
      });
    }
  }
};
</script>

<style lang="scss">
.editor {
  p {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
#hint {
  cursor: pointer;
}
</style>