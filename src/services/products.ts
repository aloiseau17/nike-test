import type { SPORT, GENDER } from '@/constants'
import productList from '@data/products.json'
import type { Product } from '@/types/product.model'
import { COLOR } from '@/constants'

/**
 * Custom currency method to convert euro string to Number
 * @param {String} price
 *
 * @returns {Number}
 */
const parseProductPrice = (price: string) => {
  return Number(price.replace(/[^0-9|,]+/g, '').replace(/[,]+/g, '.'))
}

/**
 * Build array with color constant values
 * @param {Object} product
 *
 * @returns {Object[]}
 */
const getColor = (colors: string) => {
  const productColors = colors.split(',')

  return productColors.reduce(
    (acc: (keyof typeof COLOR)[], productColor: string) => {
      const matchingColorName = (
        Object.keys(COLOR) as (keyof typeof COLOR)[]
      ).find(
        (colorName) =>
          COLOR[colorName].name === productColor.toLowerCase().trim()
      ) as keyof typeof COLOR | null

      if (matchingColorName) {
        acc.push(matchingColorName)
      }

      return acc
    },
    []
  )
}

/**
 * Setup product list by removing empty product
 * and parsing prix key as Number
 * and setting gender as lowercase
 * and setting color hex
 */
const getProductList = () => {
  return productList.reduce((acc: Product[], product) => {
    if (product.article) {
      const newProduct: Product = {
        article: product.article,
        value: parseProductPrice(product.prix),
        sexe: product.sexe.toLowerCase() as keyof typeof GENDER,
        sport: product.sport as keyof typeof SPORT,
        photo: product.photo,
        colors: getColor(product.couleur),
      }

      acc.push(newProduct)
    }

    return acc
  }, [])
}

/**
 * Simulate serveur call
 *
 * @returns {Object[]} product - list of product
 * @returns {String} product[].article - product name
 * @returns {Object[]} product[].colors - COLORS constant list of product colors
 * @returns {String} product[].couleur - original product colors name separated by comma
 * @returns {String} product[].photo - product picture file name
 * @returns {String} product[].prix - product price in euro
 * @returns {String} product[].sexe - product gender
 * @returns {String} product[].sport - product sport
 * @returns {Number} product[].value - product price
 */
const fetchProduct = (): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(getProductList())
    }, 300)
  })
}

export { fetchProduct }
