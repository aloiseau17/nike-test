<script>
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
      selected: [],
      items: [
        { label: 'Moins €50', value: 1, min: 0, max: 50 },
        { label: '€50-€100', value: 2, min: 51, max: 100 },
        { label: '€100-€150', value: 3, min: 101, max: 150 },
        { label: 'Plus €150', value: 4, min: 151, max: null },
      ],
    }
  },
  watch: {
    selected: 'onSelectHandler',
  },
  computed: {
    count() {
      return this.selected.length
    },
    selectedLabels() {
      return this.selected.map((id) => this.getRangeById(id)?.label)
    },
  },
  methods: {
    getRangeById(id) {
      return this.items.find((item) => item.value === id)
    },
    getMax(id) {
      return this.getRangeById(id)?.max || null
    },
    getMin(id) {
      return this.getRangeById(id)?.min || 0
    },
    onSelectHandler() {
      const minItem = Math.min(...this.selected)
      const maxItem = Math.max(...this.selected)

      this.$emit('update:min', this.getMin(minItem))
      this.$emit('update:max', this.getMax(maxItem))
      this.$emit('update:range', this.selectedLabels)
    },
  },
}
</script>

<template>
  <BaseCollapsable label="Rechercher par prix" :count="count">
    <BaseCheckbox
      v-for="range in items"
      v-model="selected"
      :id="range.value"
      :label="range.label"
    />
  </BaseCollapsable>
</template>
