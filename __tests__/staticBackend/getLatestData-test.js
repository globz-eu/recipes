import { server, config } from "../../mockApi/staticApi"
import getLatestData, { getRecipeById } from "../../src/staticBackend/getLatestData"
import Database from "../../src/staticBackend/db"
import recipes from "../../testData/recipes.json"

let db

beforeAll(() => {
  db = new Database()
  server.listen()
})

afterAll(() => {
  db.delete()
  server.close()
})

describe("getLatestData", () => {
  it("returns the expected local data", async () => {
    const recipeList = recipes.map(r => ({ id: r.id, name: r.name }))
    const data = await getLatestData({ backend: config.backend, db })
    expect(data).toEqual({ recipes: recipeList })
  })

  it("stores recipes in indexedDB", async () => {
    await getLatestData({ backend: config.backend, db })
    const storedRecipes = await db.recipes.toArray()
    expect(storedRecipes).toEqual(recipes)
  })
})

describe("getRecipeById", () => {
  it("returns the expected recipe data", async () => {
    const recipe = recipes[0]
    const data = await getRecipeById({ id: 0, db })
    expect(data).toEqual(recipe)
  })
})
