<script setup>
import {ref, onMounted, watch} from "vue";
import Chart from 'primevue/chart';
import { useDashboardStore } from "@/stores/dashboard.js";
import { storeToRefs } from "pinia";

const dashboardStore = useDashboardStore()
const { loading } = storeToRefs(dashboardStore)

defineProps({
  msg: {
    type: String,
    required: true
  }
})

const chartData = ref();
const chartOptions = ref();

onMounted(() => {
  dashboardStore.fetchData();
  chartOptions.value = setChartOptions();
});
function setData() {
    chartData.value = dashboardStore.getData;
}
watch(loading, setData)

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--color-heading');
  const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: textColor,
          boxWidth: 25
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: textColorSecondary
        },
        // grid: {
        //   color: surfaceBorder
        // }
      },
      y: {
        stacked: true,
        ticks: {
          color: textColorSecondary,
          stepSize: 1
        },
        grid: {
          color: surfaceBorder
        }
      }
    }
  };
}

</script>

<template>
  <div class="greetings">

    <h2>
      <a href="https://namu.wiki/w/%EC%B9%B4%EB%82%98%EB%A6%AC%EC%95%84(%EC%A1%B0%EB%A5%98)" target="_blank"
        rel="noopener">why canary 🐤</a>
    </h2>

    <h2 class="green">{{ msg }}</h2>

    <h2>
      🔥
    </h2>
    <div class="card">
      <Chart type="bar" :data="chartData" :options="chartOptions"b :width="500" :height="200" v-if="chartData"/>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h2,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>
