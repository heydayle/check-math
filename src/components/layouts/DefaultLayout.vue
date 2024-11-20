<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>
<template>
  <div class="flex flex-col">
    <Header />
    <div class="h-[calc(100vh-51px)] py-4 px-6 border-t border-t-primary">
      <div class="flex flex-col lg:flex-row h-full w-full">
        <header class="flex pt-10 lg:flex-1 justify-center items-center">
          <img alt="Vue logo" class="logo animate-delay-2000 animate-beat-spin" src="@/assets/logo.svg" width="150" height="150" />
        </header>
        <div class="flex-1 w-full">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
