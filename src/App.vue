<script>
import ProductList from '@/components/product/ProductList.vue'
import FilterGender from '@/components/filter/FilterGender.vue'

import productList from '/data/products.json'

export default {
  components: {
    ProductList,
    FilterGender,
  },
  data() {
    return {
      products: productList,
      filters: {
        gender: [],
      },
      selected: [],
    }
  },
  computed: {
    productFiltered() {
      return this.products.filter((product) => {
        return (
          !this.filters.gender.length ||
          this.filters.gender.includes(product.sexe.toLowerCase())
        )
      })
    },
  },
}
</script>

<template>
  <aside>
    <FilterGender v-model="filters.gender" />
  </aside>
  <main>
    <ProductList v-if="productFiltered" :products="productFiltered" />
    <div v-else>No products</div>
  </main>
</template>

<style lang="scss">
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

aside {
  @include tablet {
    padding: 0 0 40px 16px;
  }
}

main {
  flex: 1;
  padding: 0 40px;
}
</style>
