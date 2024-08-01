<template>
  <h1>Switch Data Table</h1>
  <div
    v-for="vlanItem in data"
    :key="vlanItem">
    <p>{{ vlanItem.hostname }}</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  const data = ref([])

  onMounted(async () => {
    console.log('Attempting to fetch switch data')
    const response = await fetch('/api/vlans')
    data.value = await response.json()
    console.log(data.value)
  })
</script>
