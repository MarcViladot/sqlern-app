<template>
  <div>
    <canvas id="gquizz_chart"></canvas>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "GQuizzsChart",
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
    const ctx = document.getElementById("gquizz_chart");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(this.user.gquizz_list),
        datasets: [
          {
            data: Object.values(this.user.gquizz_list).map(value => value),
            backgroundColor: Object.keys(this.user.gquizz_list).map(x =>
              this.randomColor()
            )
          }
        ]
      },
      options: {
        title: {
          display: true,
          fontSize: 20,
          text: "Generated Quizzes"
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              var dataset = data.datasets[tooltipItem.datasetIndex];
              var currentValue = dataset.data[tooltipItem.index];
              return currentValue + " Answers";
            },
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
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
                labelString: "Answers"
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