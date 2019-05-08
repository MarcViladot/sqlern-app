<template>
  <div>
    <canvas id="bar"></canvas>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "BarChart",
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  data() {
    return {};
  },
  mounted() {
    const ctx = document.getElementById("bar");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            label: "",
            backgroundColor: [
              "#B71C1C",
              "#C62828",
              "#D32F2F",
              "#E53935",
              "#F44336",
              "#004D40",
              "#00695C",
              "#00796B",
              "#00897B",
              "#009688",
              "#26A69A"
            ],
            data: this.user.answered_quizzs.resume
          }
        ]
      },
      options: {
        title: {
          display: true,
          fontSize: 20,
          text: "Quizzs qualifications summary"
        },
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Quizz note"
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            { scaleLabel: {
                display: true,
                labelString: "Number of quizzs"
              },
              gridLines: {
                display: false
              },
              ticks: {
                min: 0,
                beginAtZero: true,
                callback: function(value, index, values) {
                  if (Math.floor(value) === value) {
                    return value;
                  }
                }
              }
            }
          ]
        }
      }
    });
  }
};
</script>

<style scoped>
</style>