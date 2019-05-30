<template>
  <canvas id="last-quizz"></canvas>
</template>

<script>
import { mapState } from "vuex";
import Chart from "chart.js";
export default {
  name: "LastQuizzChart",
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  mounted() {
    const ctx = document.getElementById("last-quizz");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Passed", "Failed"],
        datasets: [
          {
            data: [
              this.user.last_quizz.correct,
              this.user.last_quizz.incorrect
            ],
            backgroundColor: ["#009688", "#F44336"]
          }
        ]
      },
      options: {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var meta = dataset._meta[Object.keys(dataset._meta)[0]];
              var total = meta.total;
              var currentValue = dataset.data[tooltipItem.index];
              var percentage = parseFloat(
                ((currentValue / total) * 100).toFixed(1)
              );
              return currentValue + " (" + percentage + "%)";
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          fontSize: 20,
          text: "Last Generated Quiz - " + this.user.last_quizz.quizz_code
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
      }
    });
  }
};
</script>

<style lang="scss" scoped>
</style>