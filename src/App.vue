<script>
import { COLOR, RANGE } from '@/constants'
import { faSliders, faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import ProductList from '@/components/product/ProductList.vue'
import FilterGender from '@/components/filter/FilterGender.vue'
import FilterPrice from '@/components/filter/FilterPrice.vue'
import FilterColor from '@/components/filter/FilterColor.vue'
import FilterSport from '@/components/filter/FilterSport.vue'

import { fetchProduct } from '@/services/products'

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
      open: false,
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
    fitlerIcon() {
      return faSliders
    },
    closeIcon() {
      return faCircleXmark
    },
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
    asideClass() {
      return {
        open: this.open,
      }
    },
    filterLength() {
      return (
        this.filters.price.range.length +
        this.filters.sport.length +
        this.filters.color.length +
        this.filters.gender.length
      )
    },
    resetLabel() {
      let label = 'Effacer'

      if (this.filterLength) {
        label += ` (${this.filterLength})`
      }
      return label
    },
    title() {
      const details = ['Nouveauté']

      if (this.filters.gender.length === 1) {
        const gender = this.filters.gender[0]
        details.push(this.$filters.capitalize(gender))
      }

      if (this.filters.price.range.length === 1) {
        const priceRange = RANGE[this.filters.price.range[0]].label
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
    async setProductList() {
      try {
        this.products = await fetchProduct()
      } catch (error) {
        console.log(error)
      }
    },
    toggleAsideHandler() {
      this.open = !this.open
    },
    resetFilter() {
      this.filters = {
        gender: [],
        price: {
          range: [],
          min: 0,
          max: null,
        },
        color: [],
        sport: [],
      }

      this.open = false
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
    <font-awesome-icon
      class="filter-btn"
      :icon="fitlerIcon"
      @click="toggleAsideHandler"
    />
  </header>
  <div class="products">
    <aside :class="asideClass">
      <font-awesome-icon
        class="filter-btn"
        :icon="closeIcon"
        size="3x"
        @click="toggleAsideHandler"
      />
      <FilterGender v-model="filters.gender" />
      <FilterPrice
        v-model:range="filters.price.range"
        v-model:min="filters.price.min"
        v-model:max="filters.price.max"
      />
      <FilterColor v-model="filters.color" />
      <FilterSport v-model="filters.sport" />

      <footer>
        <BaseButton @click="resetFilter">{{ resetLabel }}</BaseButton>
        <BaseButton primary @click="toggleAsideHandler">Appliquer</BaseButton>
      </footer>
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
  display: flex;
  padding: 15px 20px;
  font-weight: 500;
  font-size: 24px;

  h1 {
    flex: 1;
  }

  @include tablet {
    padding: 15px 48px;
  }

  .filter-btn {
    cursor: pointer;

    @include tablet {
      display: none;
    }
  }
}

aside {
  display: flex;
  flex-direction: column;

  @include mobile {
    position: fixed;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100vh;
    z-index: 1;
    background-color: #fff;
    padding: 0px 20px;
    overflow: auto;
  }

  @include tablet {
    width: 250px;
    padding: 0px 0px 1em 48px;
  }

  &.open {
    @include mobile {
      left: 0;
    }
  }

  .filter-btn {
    align-self: flex-end;
    margin: 10px 0;

    @include tablet {
      display: none;
    }
  }

  .collapse {
    border-top: 1px solid #e5e5e5;

    @include mobile {
      &:nth-child(2) {
        border: none;
      }
    }
  }

  footer {
    display: flex;
    padding: 20px 0;

    @include tablet {
      display: none;
    }

    & > * {
      flex: 1;
    }
  }
}

main {
  flex: 1;
  padding: 0 6px;

  @include tablet {
    padding: 0 40px;
  }

  .no-product {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}
</style>
