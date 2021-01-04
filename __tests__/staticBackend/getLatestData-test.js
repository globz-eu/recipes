import { server, config } from "../../mockApi/staticApi"
import getLatestData, { getRecipeById } from "../../src/staticBackend/getLatestData"
import recipes from "../../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getLatestData", () => {
  it("returns the expected local data", async () => {
    const recipeList = recipes.map(recipe => ({ id: recipe.id, name: recipe.name }))
    const data = await getLatestData(config.backend)
    expect(data).toEqual({ recipes: recipeList })
  })

  it("stores recipes in sessionStorage", async () => {
    await getLatestData(config.backend)
    const storedRecipes = JSON.parse(window.sessionStorage.getItem("recipes"))
    expect(storedRecipes).toEqual(recipes)
  })
})

describe("getRecipeById", () => {
  it("returns the expected recipe data", async () => {
    const recipe = recipes[0]
    const data = await getRecipeById({ id: 0 })
    expect(data).toEqual(recipe)
  })
})
