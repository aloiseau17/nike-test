<script>
import { faCheck } from '@fortawesome/free-solid-svg-icons'

export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    checkIcon() {
      return faCheck
    },
    value: {
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
  <label class="checkbox">
    <input v-model="value" type="checkbox" :value="id" />
    <span class="checkmark" :style="{ backgroundColor: color }">
      <font-awesome-icon class="checkmark__icon" :icon="checkIcon" />
    </span>
    {{ $filters.capitalize(label) }}
  </label>
</template>

<style lang="scss" scoped>
$checked-background: #000;
$checked-border: #ccc;

.checkbox {
  flex: 0 0 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark {
      .checkmark__icon {
        display: block;
      }
    }
  }

  .checkmark {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 1px solid $checked-border;

    &__icon {
      display: none;
      color: rgb(235, 235, 235);
    }
  }

  &:hover {
    color: $checked-border;
  }
}
</style>
