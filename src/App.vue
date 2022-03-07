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
          range: [],
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
    title() {
      const details = ['Nouveauté']

      if (this.filters.gender.length === 1) {
        const gender = this.filters.gender[0]
        details.push(this.$filters.capitalize(gender))
      }

      if (this.filters.price.range.length === 1) {
        const priceRange = this.filters.price.range[0]
        details.push(priceRange)
      }

      if (this.filters.color.length === 1) {
        const color = COLOR[this.filters.color[0]].name
        details.push(this.$filters.capitalize(color))
      }

      details.push(`(${this.count})`)

      return details.join(' ')
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
  <header>
    <h1>{{ title }}</h1>
  </header>
  <div class="products">
    <aside>
      <FilterGender v-model="filters.gender" />
      <FilterPrice
        v-model:range="filters.price.range"
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
  </div>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #2c3e50;
}

.products {
  display: flex;
}

header {
  font-weight: 500;
  font-size: 24px;

  @include tablet {
    padding: 15px 48px;
  }
}

aside {
  @include tablet {
    width: 250px;
    padding: 0px 0px 1em 48px;
  }

  .collapse {
    border-top: 1px solid #e5e5e5;
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
