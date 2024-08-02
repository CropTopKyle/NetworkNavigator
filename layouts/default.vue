<template>
  <div class="container mx-auto max-w">
    <header class="flex justify-between items-center mt-5">
      <div>
        <NuxtLink
          to="/"
          class="p-1 text-xl font-semibold"
          >Network Navigator</NuxtLink
        >
      </div>

      <div>
        <TheNavigationMenu />
      </div>
    </header>
    <main class="p-2 mt-10">
      <slot />
    </main>
  </div>
</template>

<script setup>
  import TheNavigationMenu from '@/components/TheNavigationMenu.vue'
</script>
