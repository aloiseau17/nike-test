<script>
import ProductItem from '@/components/product/ProductItem.vue'

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  components: {
    ProductItem,
  },
}
</script>

<template>
  <div class="product-list">
    <ProductItem v-for="product in products" :product="product" />
  </div>
</template>

<style lang="scss" scoped>
$columns-gap: 6px;

.product-list {
  display: flex;
  flex-wrap: wrap;
  column-gap: $columns-gap;
  row-gap: 18px;
}

.product {
  width: calc(50% - #{$columns-gap}/ 2);

  @include tablet {
    width: calc(33% - #{$columns-gap}/ 2);
  }
}
</style>
