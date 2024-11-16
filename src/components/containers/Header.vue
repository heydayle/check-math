<script setup lang="ts">
</script>
<template>
  <div class="p-2 mb-4 border-b border-b-gray-500 flex justify-between">
    <div></div>
    <div>
      <ul class="flex items-center space-x-4">
        <li>
          <Button rounded outlined size="small">v0.0.1</Button>
        </li>
        <li>
          <Button rounded outlined size="small">
            Github <i class="pi pi-arrow-up-right !text-xs"/>
          </Button>
        </li>
        <li>
          <ToggleSwitch class="inline-block mt-1">
            <template #handle="{ checked }">
              <i :class="['!text-xs pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
            </template>
          </ToggleSwitch>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
</style>
