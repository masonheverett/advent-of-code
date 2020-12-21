const _ = require('lodash')

const solve = (data) => {
  let allergensMap = {}
  let ingredientCount  = {}
  let allIngredients = []
  const matchedAllergens = {}
  let unsafeIngredients = []

  _.forEach(data, (food) => {
    const splitFood = food.replace(')', '').split(' (contains ')
    const ingredients = splitFood[0].split(' ')
    const allergens = splitFood[1].split(', ')

    _.forEach(allergens, (allergen) => {
      if (allergensMap[allergen] != null) {
        allergensMap[allergen] = new Set(ingredients.filter(i => allergensMap[allergen].has(i)))
      } else {
        allergensMap[allergen] = new Set(ingredients)
      }
    })

    _.forEach(ingredients, (ingredient)  =>  {
      if (ingredientCount[ingredient] != null) ingredientCount[ingredient] ++
      else {
        ingredientCount[ingredient] = 1
        allIngredients.push(ingredient)
      }
    })
  })

  let keys = Object.keys(allergensMap)
  while(keys.length > 0) {
      const matched = keys.find(k => allergensMap[k].size === 1)
      const ingredient = allergensMap[matched].values().next().value

      if (!_.includes(unsafeIngredients, ingredient)) unsafeIngredients.push(ingredient)

      matchedAllergens[matched] = ingredient
      delete allergensMap[matched]
  
      for (const allergen in allergensMap) {
        allergensMap[allergen].delete(ingredient)
      }
  
      keys = Object.keys(allergensMap)
  }

  const safeIngredients = _.pullAll(allIngredients, unsafeIngredients)
  console.log(safeIngredients.map(ingredient => ingredientCount[ingredient]).reduce((a, b) => a+b, 0))
}

module.exports = { solve }
