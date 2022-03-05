<script>
import { COLOR } from '@/constants'
import ProductList from '@/components/product/ProductList.vue'
import FilterGender from '@/components/filter/FilterGender.vue'
import FilterPrice from '@/components/filter/FilterPrice.vue'
import FilterColor from '@/components/filter/FilterColor.vue'
import FilterSport from '@/components/filter/FilterSport.vue'

import productList from '/data/products.json'

export default {
  components: {
    ProductList,
    FilterGender,
    FilterPrice,
    FilterColor,
    FilterSport,
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
        color: [],
        sport: [],
      },
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
        const matchColor = this.matchColor(product)
        const matchSport = this.matchSport(product)
        return matchGender && matchPrice && matchColor && matchSport
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
     * and setting color hex
     */
    setProductList() {
      this.products = productList.reduce((acc, product) => {
        if (product.article) {
          product.value = this.parseProductPrice(product.prix)
          product.sexe = product.sexe.toLowerCase()
          product.colors = this.getColor(product)

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
    getColor(product) {
      const productColors = product.couleur.split(',')

      return productColors.reduce((acc, productColor) => {
        const matchingColorName = Object.keys(COLOR).find(
          (colorName) =>
            COLOR[colorName].name === productColor.toLowerCase().trim()
        )

        if (matchingColorName) {
          acc.push(matchingColorName)
        }

        return acc
      }, [])
    },

    /// MATCHING METHODS ///
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
    matchColor(product) {
      return (
        !this.filters.color.length ||
        product.colors.find((color) => this.filters.color.includes(color))
      )
    },
    matchSport(product) {
      return (
        !this.filters.sport.length ||
        this.filters.sport.includes(product.sport.toLowerCase())
      )
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
    <FilterColor v-model="filters.color" />
    <FilterSport v-model="filters.sport" />
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
    width: 200px;
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
