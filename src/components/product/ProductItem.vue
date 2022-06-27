<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { Product } from '@/types/product.model'
import { GENDER } from '@/constants'

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  computed: {
    imagePath() {
      return this.product.photo ? `/images/${this.product.photo}` : undefined
    },
    colorLength() {
      return this.product.colors.length
    },
    color() {
      return this.colorLength > 1
        ? `${this.colorLength} couleurs`
        : `${this.colorLength} couleur`
    },
    gender() {
      switch (this.product.sexe) {
        case GENDER.MALE:
          return 'Chaussure pour Homme'

        case GENDER.FEMALE:
          return 'Chaussure pour Femme'

        default:
          return 'Chaussure'
      }
    },
  },
})
</script>

<template>
  <div v-if="product.article" class="product">
    <div class="product__image">
      <img :src="imagePath" />
    </div>
    <div class="product__detail">
      <div class="product__name" v-text="product.article" />
      <div class="product__gender" v-text="gender" />
      <div class="product__color" v-text="color" />
      <div class="product__price" v-text="product.prix" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  &__image {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: auto;
    }
  }

  &__detail {
    padding: 12px 12px 0px;
  }

  &__name {
    font-weight: bold;
  }

  &__price {
    font-weight: bold;
    padding-top: 12px;
  }
}
</style>
