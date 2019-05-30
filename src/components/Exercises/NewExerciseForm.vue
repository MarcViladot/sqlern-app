<template>
  <div>
    <h3>Create Exercise</h3>
    <v-form v-model="valid" class="fields">
      <div class="row">
        <div class="col">
          <v-textarea
            label="Exercise Statement"
            solo
            v-model="statement"
            rows="1"
            :rules="statementRules"
            required
          ></v-textarea>
        </div>

        <div class="col">
          <v-checkbox v-model="privat" label="This exercise is private" color="primary"></v-checkbox>
        </div>
      </div>

      <div class="row col-lg-12">
        <div class="code-editor">
          <span class="header">
            <v-icon small>code</v-icon>&nbsp;
            <b>Code Editor</b>
          </span>
          <span class="tab"></span>
          <div class="editor">
            <codemirror v-model="solution" :options="cmOption" :rules="solutionRules" required></codemirror>
          </div>
        </div>
        <div class="hint">
          <v-textarea solo name="hint" class="text" label="Hint" v-model="hint"></v-textarea>
          <v-select
            :items="user.conceptualmodels"
            label="Conceptual Model"
            v-model="model"
            item-text="name"
            solo
            required
            item-value="id"
          ></v-select>
          <div>
            <v-expansion-panel>
              <v-expansion-panel-content>
                <div slot="header">Topics</div>
                <v-card>
                  <v-card-text class="topics">
                    <div class="container">
                      <div v-for="(topic, index) in topics" :key="topic.id" id="topics">
                        <v-checkbox
                          :label="topic.name"
                          color="primary"
                          v-model="checkedTopics[index]"
                          :value="topic.id"
                        ></v-checkbox>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </div>
          <v-btn
            color="primary"
            v-on:click="create"
            :disabled="!valid || !solution || !model"
            type="submit"
          >Create Exercise</v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import "codemirror/theme/idea.css";
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
      hint: "",
      checkedTopics: [],
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
  computed: {
    ...mapState({
      user: state => state.user.currentUser,
      topics: state => state.topic.all
    })
  },
  methods: {
    create() {
      const data = {
        solution: this.solution,
        statement: this.statement,
        conceptualmodel_id: this.model,
        public: !this.private,
        topics: this.checkedTopics.join("+")
      };
      this.$store.dispatch("exercise/create", { data, hint: this.hint });
    }
  }
};
</script>

<style lang="scss">
.a {
  width: 60%;
  margin-left: 15px;
  margin-right: 20px;
  label {
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
}
.topics {
  padding-bottom: 30px;
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