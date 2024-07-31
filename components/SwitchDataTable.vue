<template>
  <h1>Switch Data Table</h1>
</template>

<script setup>
  const data = []

  onMounted(async () => {
    console.log('Attempting to fetch switch data')
    const response = await fetch('/api/switches')
    data.value = await response.json()
    console.log(data.value)
  })
</script>
