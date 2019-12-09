import testRecipes from "../../testData/recipes.json"

export default async function updateData(setData) {
  const data = await getData()
  setData(data)
}

async function getData() {
  return new Promise(resolve => {
    resolve(testRecipes)
  })
}
