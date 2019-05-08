<template>
  <div class="col-lg-12">
    <v-layout row>
      <div class="col">
        <v-card class="card">
          <TopicsChart/>
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
        <v-card class="card">
          <DoughnutQuizzs/>
        </v-card>
      </div>
      <div class="col">
        <v-card class="card">
          <BarChart/>
        </v-card>
      </div>
    </v-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DoughnutChart from "./charts/DoughnutChart.vue";
import DoughnutQuizzs from "./charts/DoughnutQuizzs.vue";
import TopicsChart from "./charts/TopicsChart.vue";
import BarChart from "./charts/BarChart.vue";
export default {
  name: "HomeStudent",
  components: {
    DoughnutChart,
    BarChart,
    DoughnutQuizzs,
    TopicsChart
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