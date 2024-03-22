<script setup>
import { ref, watch } from 'vue'

import Dashboard from './components/Dashboard.vue'
import Gate from './components/Gate.vue'

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/canary-log.png" width="88%" />

    <div class="wrapper">
      <Dashboard msg="data observability sys" />
    </div>
  </header>

  <main>
    <Gate />
  </main>



</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: block;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
