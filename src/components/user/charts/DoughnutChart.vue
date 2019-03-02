<template>
  <div>
    <canvas id="doughnut"></canvas>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Chart from "chart.js";
export default {
  name: "DoughnutChart",
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  data() {
    return {};
  },
  mounted() {
    const ctx = document.getElementById("doughnut");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            data: [this.user.answereds.correct, this.user.answereds.incorrect],
            backgroundColor: ['#009688', '#F44336']
          }
        ]
      },
      options: {
          title: {
            display: true,
            fontSize: 20,
            text: 'My Answered Exercises'
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      }
    });
  }
};
</script>

<style scoped>
</style>