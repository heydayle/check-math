<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>
<template>
  <div class="flex flex-col">
    <Header />
    <div class="h-screen py-4">
      <div class="flex w-full">
        <header class="flex items-center">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
          <div class="wrapper">
            <HelloWorld msg="Check math!" />
          </div>
        </header>
        <RouterView />
      </div>
    </div>
  </div>
</template>
