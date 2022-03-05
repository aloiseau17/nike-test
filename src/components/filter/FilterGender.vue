<script>
import { GENDER } from '@/constants'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'

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
  },
  data() {
    return {
      items: GENDER,
    }
  },
  computed: {
    label() {
      return this.selected.length ? `Sexe (${this.selected.length})` : 'Sexe'
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
  <div class="filter__label" v-text="label" />
  <div class="checkbox" v-for="gender in items">
    <BaseCheckbox v-model="selected" :id="gender" :label="gender" />
  </div>
</template>

<style lang="scss" scoped>
.filter {
  &__label {
    font-weight: bold;
    padding: 12px 0;
  }
}
.checkbox {
  display: flex;
}
</style>
