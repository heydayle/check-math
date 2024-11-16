<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>
<template>
  <div class="flex flex-col">
    <Header />
    <div class="h-[calc(100vh-51px)] py-4 px-6 border-t border-t-primary">
      <div class="flex h-full w-full">
        <header class="hidden sm:flex items-center">
          <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
          <div class="wrapper">
            <HelloWorld msg="Check math!" />
          </div>
        </header>
        <div class="w-full">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
