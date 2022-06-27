<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { GENDER } from '@/constants'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseCollapsable from '@/components/base/BaseCollapsable.vue'

export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  components: {
    BaseCheckbox,
    BaseCollapsable,
  },
  data() {
    return {
      items: GENDER,
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
      set(value: string[]) {
        this.$emit('update:modelValue', value)
      },
    },
  },
})
</script>

<template>
  <BaseCollapsable label="Sexe" :count="count">
    <BaseCheckbox
      v-for="gender in items"
      v-model="selected"
      :id="gender"
      :label="gender"
    />
  </BaseCollapsable>
</template>
