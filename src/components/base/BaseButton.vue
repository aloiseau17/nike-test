<script>
export default {
  props: {
    primary: {
      type: Boolean,
    },
  },
  computed: {
    buttonClass() {
      return {
        primary: this.primary,
      }
    },
  },
}
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  max-width: 100%;
  margin-bottom: 0; // For input.btn
  padding: 15px 25px;

  text-align: center;
  white-space: nowrap;

  touch-action: manipulation;
  cursor: pointer;
  background-image: none; // Reset unusual Firefox-on-Android default style; see https://github.com/necolas/normalize.css/issues/214
  border: none;
  border-radius: 50px;

  transition: background-color 0.3s;

  &.primary {
    background: #000;
    color: #fff;
  }

  &:not(.primary) {
    color: #000;
    background: #fff;
    border: 1px solid #e5e5e5;
  }
}
</style>
