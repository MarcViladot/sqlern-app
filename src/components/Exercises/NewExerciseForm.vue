<template>
  <div>
    <h3>Create Exercise</h3>
    <div class="row">
      <div class="col">
        <label>Statement</label>
        <v-textarea label="Exercise Statement" v-model="statement" rows="1"></v-textarea>
      </div>

      <div id="conceptual" class="col">
        <label>Conceptual Model</label>
        <v-select
          :items="user.conceptualmodels"
          label="Conceptual Model"
          v-model="model"
          item-text="name"
          item-value="id"
        ></v-select>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <label>Solution</label>
        <codemirror v-model="solution" :options="cmOption" id="codemirror"></codemirror>
      </div>
      <div class="col">
        <label>Topics</label>
        <div v-for="(topic, index) in topics" :key="topic.id" id="topics">
          <v-checkbox
            :label="topic.name"
            color="primary"
            v-model="checkedTopics[index]"
            :value="topic.id"
          ></v-checkbox>
        </div>
      </div>
    </div>

    <v-layout row justify-space-between id="foot">
      <v-flex xs2>
        <v-checkbox v-model="privat" label="This exercise is private" color="primary"></v-checkbox>
      </v-flex>

      <v-flex xs3>
        <v-btn color="accent">Cancel</v-btn>
        <v-btn color="primary" v-on:click="create">Create Exercise</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import "codemirror/theme/base16-light.css";
import "codemirror/mode/sql/sql.js";
import { mapState } from "vuex";
import exercises from "../../api/exercises";
export default {
  data() {
    return {
      solution: "",
      statement: "",
      privat: false,
      model: undefined,
      checkedTopics: [],
      cmOption: {
        tabSize: 3,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-mysql",
        theme: "base16-light"
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser,
      topics: state => state.topic.all
    })
  },
  methods: {
    create() {
      const data = {
        data: {
          solution: this.solution,
          statement: this.statement,
          conceptualmodel_id: this.model,
          public: !this.private
        },
        topics: this.checkedTopics
      };
      this.$store.dispatch("exercise/create", data);
    }
  }
};
</script>

<style lang="scss">
label {
  font-size: 16px;
}
#foot {
  padding: 15px;
}
.row {
  margin-bottom: 15px;
}
#topics {
  label {
    margin: 0;
  }
}
</style>