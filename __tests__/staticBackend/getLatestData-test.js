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
    const recipesNames = recipes.map(recipe => ({ id: recipe.id, name: recipe.name }))
    const data = await getLatestData(config.backend)
    expect(data).toEqual({ recipes: recipesNames })
  })
})

describe("getRecipeById", () => {
  it("returns the expected recipe data", async () => {
    const recipe = recipes[0]
    const data = await getRecipeById(config.backend, 0)
    expect(data).toEqual(recipe)
  })
})
