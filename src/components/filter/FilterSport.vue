<script>
import { SPORT } from '@/constants'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseCollapsable from '@/components/base/BaseCollapsable.vue'

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
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
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },
  },
}
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
