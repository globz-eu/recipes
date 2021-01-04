import { server, config } from "../../mockApi/authApi"
import getLatestData from "../../src/restBackend/getLatestData"
import recipes from "../../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getLatestData", () => {
  it("returns the expected API data", async () => {
    const recipesNames = recipes.map(recipe => ({ id: recipe.id, name: recipe.name }))
    const data = await getLatestData(config.backend, "accessToken")
    expect(data).toEqual({ recipes: recipesNames })
  })

  it("returns an error when unauthorized", async () => {
    await expect(
      getLatestData(config.backend, "invalidAccessToken")
    ).rejects.toThrowError("403")
  })
})