import _ from 'lodash'

export const solve = (data) => {
  let allergensMap = {}
  const matchedAllergens = {}

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
  })

  let keys = Object.keys(allergensMap)
  while(keys.length > 0) {
      const matched = keys.find(k => allergensMap[k].size === 1)
      const ingredient = allergensMap[matched].values().next().value

      matchedAllergens[matched] = ingredient
      delete allergensMap[matched]
  
      for (const allergen in allergensMap) {
        allergensMap[allergen].delete(ingredient)
      }
  
      keys = Object.keys(allergensMap)
  }

  console.log(Object.keys(matchedAllergens).sort().map(allergen => matchedAllergens[allergen]).join(','))
}
