<script setup lang="ts">
interface IProps {
  label: string
  value: number | string
}
defineProps<IProps>()
</script>
<template>
  <div class="explain flex justify-between">
    <div> {{ label }}: </div>
    <div class="text-bold"> {{ value }}</div>
  </div>
</template>
