<script>
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default {
  props: {
    count: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: true,
    }
  },
  computed: {
    upIcon() {
      return faChevronUp
    },
    title() {
      return this.count ? `${this.label} (${this.count})` : this.label
    },
    activeClass() {
      return {
        active: this.open,
      }
    },
  },
  methods: {
    toggleVisibility() {
      this.open = !this.open
    },
  },
}
</script>

<template>
  <div class="collapse" :class="activeClass">
    <div class="collapse__title" @click="toggleVisibility">
      <div class="collapse__label">
        {{ title }}
      </div>
      <font-awesome-icon class="collapse__icon" :icon="upIcon" />
    </div>
    <div class="collapse__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collapse {
  &__label {
    flex: 1;
  }

  &__title {
    display: flex;
    font-weight: bold;
    padding: 12px 0;
    cursor: pointer;
  }

  &__icon {
    margin-left: 8px;
  }

  &__content {
    overflow: hidden;
  }

  &:not(.active) {
    .collapse__icon {
      transform: rotate(180deg);
    }

    .collapse__content {
      height: 0;
    }
  }
}
</style>
