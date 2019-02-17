<template>
  <div>
    <div>
      <p>
        <b>Current tables in Database</b>
      </p>
      <span v-for="(table, index) in tables" :key="table">
        <span>{{table}}</span>
        <span v-if="index+1 < tables.length">,&nbsp;</span>
      </span>
    </div>
    <br>
    <div>
      <v-card class="editor">
        <p>SQL Creation Script</p>
        <codemirror v-model="query" :options="cmOption"></codemirror>
      </v-card>
    </div>
    <div>
      <v-btn color="primary" class="float-right" v-on:click="createTables">Execute Script</v-btn>
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
            alert('ok');
        })
        .catch(error => console.log(error));
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
</style>