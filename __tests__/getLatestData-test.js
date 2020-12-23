import { rest } from "msw"
import { server, config } from "../mockApi/api"
import getLatestData from "../src/restBackend/getLatestData"
import recipes from "../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getLatestData", () => {
  it("returns the expected API data", async () => {
    const response = await getLatestData(config.backend)
    expect(response).toEqual({ recipes })
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
