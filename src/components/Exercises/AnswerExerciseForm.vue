<template>
  <v-card class="card">
    <div>
      <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Conceptual Model</div>
          <v-card>
            <img v-bind:src="exercise.conceptualmodel.url" class="img">
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
    <div class="row col-lg-12">
      <v-card class="editor">
        <p>
          <v-icon small>code</v-icon>&nbsp;
          <b>Code Editor</b>
          <span class="float-right" v-if="exercise.comments.length > 0 && !quizz && !hint">
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
      <span v-if="hint" class="hint">
        <h5>Hint:</h5>
        {{exercise.comments[0].comment}}
      </span>
    </div>
    <br>
    <div v-if="!quizz">
      <transition name="slide-fade">
        <span class="float-left" v-if="correct !== undefined">
          <div v-if="correct">
            <h5>Correct</h5>
            <span style="color: green">{{exercise.solution}}</span>
          </div>
          <div v-else>
            <h5>Incorrect</h5>
            <span style="color: red">{{exercise.solution}}</span>
          </div>
        </span>
      </transition>
      <v-btn color="secondary" class="float-right" v-on:click="next" v-if="answered">Next</v-btn>
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
    },
    next() {
      this.$emit("next");
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
  margin: 0 !important;
}
.hint {
  margin-left: 10px;
}
#hint {
  cursor: pointer;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>