<template>
  <div>
    <canvas id="quizzs"></canvas>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Chart from "chart.js";
export default {
  name: "DoughnutQuizzs",
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  data() {
    return {};
  },
  mounted() {
    const ctx = document.getElementById("quizzs");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Passed", "Failed"],
        datasets: [
          {
            data: [
              this.user.answered_quizzs.correct,
              this.user.answered_quizzs.incorrect
            ],
            backgroundColor: ["#009688", "#F44336"]
          }
        ]
      },
      options: {
        title: {
          display: true,
          fontSize: 20,
          text: "My Answered Quizzs"
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