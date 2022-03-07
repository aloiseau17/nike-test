import productList from '/data/products.json'
import { COLOR } from '@/constants'

/**
 * Custom currency method to convert euro string to Number
 * @param {String} price
 *
 * @returns {Number}
 */
const parseProductPrice = (price) => {
  return Number(price.replace(/[^0-9|,]+/g, '').replace(/[,]+/g, '.'))
}

/**
 * Build array with color constant values
 * @param {Object} product
 *
 * @returns {Object[]}
 */
const getColor = (colors) => {
  const productColors = colors.split(',')

  return productColors.reduce((acc, productColor) => {
    const matchingColorName = Object.keys(COLOR).find(
      (colorName) => COLOR[colorName].name === productColor.toLowerCase().trim()
    )

    if (matchingColorName) {
      acc.push(matchingColorName)
    }

    return acc
  }, [])
}

/**
 * Setup product list by removing empty product
 * and parsing prix key as Number
 * and setting gender as lowercase
 * and setting color hex
 */
const getProductList = () => {
  return productList.reduce((acc, product) => {
    if (product.article) {
      product.value = parseProductPrice(product.prix)
      product.sexe = product.sexe.toLowerCase()
      product.colors = getColor(product.couleur)

      acc.push(product)
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
const fetchProduct = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(getProductList())
    }, 300)
  })
}

export { fetchProduct }
