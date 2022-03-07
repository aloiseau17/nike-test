<script>
import { RANGE } from '@/constants'
import BaseCheckbox from '@/components/base/BaseCheckbox.vue'
import BaseCollapsable from '@/components/base/BaseCollapsable.vue'

export default {
  emits: ['update:range', 'update:min', 'update:max'],
  props: {
    range: {
      type: Array,
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
        return this.range
      },
      set(values) {
        const selected = values.map((value) => Number(value))
        const minItem = Math.min(...selected)
        const maxItem = Math.max(...selected)

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
    getRangeById(id) {
      return this.items[id]
    },
    getMax(id) {
      return this.getRangeById(id)?.max || null
    },
    getMin(id) {
      return this.getRangeById(id)?.min || 0
    },
  },
}
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
