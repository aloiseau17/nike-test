<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { RANGE } from '@/constants'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseCollapsable from '@/components/base/BaseCollapsable.vue'

export default defineComponent({
  emits: ['update:range', 'update:min', 'update:max'],
  props: {
    range: {
      type: Array as PropType<(keyof typeof RANGE)[]>,
      required: true,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: null,
    },
  },
  components: {
    BaseCheckbox,
    BaseCollapsable,
  },
  data() {
    return {
      items: RANGE,
    }
  },
  computed: {
    selected: {
      get() {
        return this.range.map((value) => String(value))
      },
      set(values: string[]) {
        const selected = values.map(
          (value) => Number(value) as keyof typeof RANGE
        )
        const minItem = Math.min(...selected) as keyof typeof RANGE
        const maxItem = Math.max(...selected) as keyof typeof RANGE

        this.$emit('update:min', this.getMin(minItem))
        this.$emit('update:max', this.getMax(maxItem))
        this.$emit('update:range', selected)
      },
    },
    count() {
      return this.selected.length
    },
  },
  methods: {
    getRangeById(id: keyof typeof RANGE) {
      return this.items[id]
    },
    getMax(id: keyof typeof RANGE): number | null {
      return this.getRangeById(id)?.max || null
    },
    getMin(id: keyof typeof RANGE): number {
      return this.getRangeById(id)?.min || 0
    },
  },
})
</script>

<template>
  <BaseCollapsable label="Rechercher par prix" :count="count">
    <BaseCheckbox
      v-for="(rangeItem, index) in items"
      v-model="selected"
      :id="index"
      :label="rangeItem.label"
    />
  </BaseCollapsable>
</template>
