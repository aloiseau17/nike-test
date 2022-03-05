<script>
import ProductList from '@/components/product/ProductList.vue'
import productList from '/data/products.json'

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      products: productList,
    }
  },
}
</script>

<template>
  <aside>
    <FilterGender />
  </aside>
  <main>
    <ProductList v-if="products" :products="products" />
    <div v-else>Loading...</div>
  </main>
</template>

<style>
@import 'reset-css';

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #2c3e50;
}
</style>
