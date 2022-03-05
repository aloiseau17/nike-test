<script>
import { GENDER } from '@/constants'

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imagePath() {
      return this.product.photo ? `/images/${this.product.photo}` : null
    },
    colorLength() {
      return this.product.couleur.split(',').length
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
}
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
    padding-top: 12px;
  }
}
</style>
