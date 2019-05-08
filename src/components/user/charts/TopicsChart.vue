<template>
  <div>
    <canvas id="topics"></canvas>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Chart from "chart.js";
export default {
  name: "TopicsChart",
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
    const ctx = document.getElementById("topics");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: Object.keys(this.user.failed_topics),
        datasets: [
          {
            data: Object.values(this.user.failed_topics).map(value => value),
            backgroundColor: Object.keys(this.user.failed_topics).map(x =>
              this.randomColor()
            )
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
          text: "Most failed Topics"
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