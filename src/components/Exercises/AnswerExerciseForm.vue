<template>
  <v-card class="card" style="background-color: #EEEEF0; border-color: white;">
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
      <div class="code-editor">
        <span class="header">
          <v-icon small>code</v-icon>&nbsp;
          <b>Code Editor</b>
          <span v-if="exercise.comments.length > 0 &&  !quizz && !hint" class="bulb">
            <v-tooltip bottom>
              <template #activator="data">
                <v-icon
                  v-on="data.on"
                  slot="activator"
                  id="hint"
                  small
                  v-on:click="hint = true"
                >wb_incandescent</v-icon>
              </template>
              <span>Show hint</span>
            </v-tooltip>
          </span>
        </span>
        <span class="tab"></span>
        <div class="editor">
          <codemirror
            v-model="solution"
            :options="cmOption"
            id="codemirror"
            v-on:input="solutionChanged"
          ></codemirror>
        </div>
      </div>

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
        :disabled="answered || !solution"
      >Check</v-btn>
    </div>
  </v-card>
</template>

<script>
import exercises from "../../api/exercises";
import "codemirror/theme/idea.css";
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
        theme: "idea"
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
.hint {
  margin-left: 40px;
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