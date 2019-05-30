<template>
  <div>
    <v-card class="aaa">
      <h5>
        <b>Current tables in Database</b>
      </h5>
      <span v-for="(table) in tables" :key="table">
        <v-chip color="primary" disabled style="color: white">{{table}}</v-chip>
      </span>
    </v-card>
    <br>
    <div>
      <v-textarea solo v-model="query" rows="10" auto-grow></v-textarea>
    </div>
    <div>
      <v-btn color="primary" v-on:click="createTables" :disabled="!query">Execute Script</v-btn>
    </div>
  </div>
</template>

<script>
import "codemirror/theme/base16-light.css";
import "codemirror/mode/sql/sql.js";
import tables from "../../api/tables";
export default {
  name: "NewTablesForm",
  data() {
    return {
      tables: [],
      cmOption: {
        tabSize: 10,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: "text/x-mysql",
        theme: "base16-light"
      },
      query: ""
    };
  },
  created() {
    tables
      .getTables()
      .then(res => {
        this.tables = res;
      })
      .catch(error => console.log(error));
  },
  methods: {
    createTables() {
      tables
        .create(this.query)
        .then(res => {
          alert("ok");
        })
        .catch(error => console.log(error));
    }
  }
};
</script>

<style lang="scss">
.aaa {
  padding: 10px;
}
</style>