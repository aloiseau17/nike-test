<script>
import ProductList from '@/components/product/ProductList.vue'
import FilterGender from '@/components/filter/FilterGender.vue'
import FilterPrice from '@/components/filter/FilterPrice.vue'

import productList from '/data/products.json'

export default {
  components: {
    ProductList,
    FilterGender,
    FilterPrice,
  },
  data() {
    return {
      products: [],
      filters: {
        gender: [],
        price: {
          min: 0,
          max: null,
        },
      },
      selected: [],
    }
  },
  computed: {
    count() {
      return this.productFiltered.length
    },
    productFiltered() {
      return this.products.filter((product) => {
        const matchGender = this.matchGender(product)
        const matchPrice = this.matchPrice(product)
        return matchGender && matchPrice
      })
    },
  },
  created() {
    this.setProductList()
  },
  methods: {
    /**
     * Setup product list by removing empty product
     * and parsing prix key as Number
     * and setting gender as lowercase
     */
    setProductList() {
      this.products = productList.reduce((acc, product) => {
        if (product.article) {
          product.value = this.parseProductPrice(product.prix)
          product.sexe = product.sexe.toLowerCase()
          acc.push(product)
        }
        return acc
      }, [])
    },
    /**
     * Custom currency method to convert euro string to Number
     * @param {String} price
     *
     * @returns {Number}
     */
    parseProductPrice(price) {
      return Number(price.replace(/[^0-9|,]+/g, '').replace(/[,]+/g, '.'))
    },
    matchGender(product) {
      return (
        !this.filters.gender.length ||
        this.filters.gender.includes(product.sexe)
      )
    },
    matchPrice(product) {
      const matchMin = product.value > this.filters.price.min
      const matchMax = this.filters.price.max
        ? product.value <= this.filters.price.max
        : true

      return matchMax && matchMin
    },
  },
}
</script>

<template>
  <aside>
    <FilterGender v-model="filters.gender" />
    <FilterPrice
      v-model:min="filters.price.min"
      v-model:max="filters.price.max"
    />
  </aside>
  <main>
    <ProductList v-if="count" :products="productFiltered" />
    <div v-else class="no-product">Aucun produits disponible</div>
  </main>
</template>

<style lang="scss">
@import 'reset-css';

* {
  box-sizing: border-box;
}

html,
body {
  min-height: 100vh;
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

  .no-product {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
