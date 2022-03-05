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
    <span class="checkmark">
      <font-awesome-icon class="checkmark__icon" :icon="checkIcon" />
    </span>
    {{ $filters.capitalize(label) }}
  </label>
</template>

<style lang="scss" scoped>
$checked-background: #000;
$checked-border: #ccc;

.checkbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ .checkmark {
      background-color: $checked-background;

      .checkmark__icon {
        display: block;
      }
    }
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    width: 20px;
    border-radius: 4px;
    border: 1px solid $checked-border;

    &__icon {
      display: none;
      color: #fff;
    }
  }

  &:hover input ~ .checkmark {
    background-color: $checked-border;
  }
}
</style>
