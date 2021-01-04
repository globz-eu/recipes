import { rest } from "msw"
import { server, config } from "../../mockApi/api"
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
    const response = await getLatestData(config.backend)
    expect(response).toEqual({ recipes: recipesNames })
  })

  it("throws an error with the response status", async () => {
    server.use(
      rest.get(config.backend, (req, res, ctx) => res.once(
        ctx.status(404),
      )),
    )
    await expect(getLatestData(config.backend)).rejects.toThrow("404")
  })
})