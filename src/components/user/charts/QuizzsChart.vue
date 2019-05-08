<template>
  <div>
    <canvas id="quizz_chart"></canvas>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "QuizzsChart",
  computed: {
    ...mapState({
      user: state => state.user.currentUser
    })
  },
  data() {
    return {};
  },
  methods: {
    randomColor() {
      return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    }
  },
  mounted() {
    const ctx = document.getElementById("quizz_chart");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(this.user.quizz_list),
        datasets: [
          {
            data: Object.values(this.user.quizz_list).map(value => value),
            backgroundColor: Object.keys(this.user.quizz_list).map(x =>
              this.randomColor()
            )
          }
        ]
      },
      options: {
        title: {
          display: true,
          fontSize: 20,
          text: "My Quizzs"
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: false
              },
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Times Generated"
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