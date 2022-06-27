<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { SPORT } from '@/constants'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseCollapsable from '@/components/base/BaseCollapsable.vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array as PropType<Lowercase<keyof typeof SPORT>[]>,
      required: true,
    },
  },
  components: {
    BaseCheckbox,
    BaseCollapsable,
  },
  data() {
    return {
      items: SPORT,
    }
  },
  computed: {
    count() {
      return this.selected.length
    },
    selected: {
      get() {
        return this.modelValue
      },
      set(value: keyof typeof SPORT) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
</script>

<template>
  <BaseCollapsable label="Sports" :count="count">
    <BaseCheckbox
      v-for="sport in items"
      v-model="selected"
      :id="sport"
      :label="sport"
    />
  </BaseCollapsable>
</template>
