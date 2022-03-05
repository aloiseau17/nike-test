<script>
import { COLOR } from '@/constants'
import BaseCollapsable from '@/components/base/BaseCollapsable.vue'
import BaseCheckboxColor from '@/components/base/BaseCheckboxColor.vue'

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  components: {
    BaseCollapsable,
    BaseCheckboxColor,
  },
  data() {
    return {
      items: COLOR,
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
  <BaseCollapsable label="Couleur" :count="count">
    <BaseCheckboxColor
      v-for="(color, index) in items"
      v-model="selected"
      :id="index"
      :color="color.hex"
      :label="color.name"
    />
  </BaseCollapsable>
</template>

<style lang="scss" scoped>
:deep(.collapse__content) {
  display: flex;
  flex-wrap: wrap;
}
</style>
