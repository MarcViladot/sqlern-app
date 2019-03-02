<template>
  <div class="col-lg-12">
    <v-layout row>
      <div class="col">
      <v-card class="card">
        
      </v-card>
      </div>
      <div class="col">
      <v-card class="card">
        <DoughnutChart/>
      </v-card>
      </div>
    </v-layout>

    <v-layout row>
      <div class="col">
      <v-card class="card"></v-card>
      </div>
      <div class="col">
      <v-card class="card"></v-card>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Chart from "chart.js";
import DoughnutChart from "./charts/DoughnutChart.vue";
export default {
  name: "HomeStudent",
  components: {
    DoughnutChart
  },
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style scoped>
</style>