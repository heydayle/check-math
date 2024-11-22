<script setup lang="ts">
import ExplainItem from '@/components/game/ExplainItem.vue'
interface ISummary {
  key: string
  value: string | number
}
interface Props {
  summary: ISummary[]
}
defineProps<Props>()
</script>
<template>
  <div class="game-summary text-xl max-w-[300px] m-auto">
    <ExplainItem
      v-for="(item, index) in summary"
      :key="index"
      :label="item.key"
      :value="item.value"
      :class="{ 'mt-2 text-primary text-3xl font-black': item.key === 'Score' }"
    />
  </div>
</template>
