import { server, config } from "../mockApi/staticApi"
import getLatestData from "../src/staticBackend/getLatestData"
import recipes from "../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getLatestData", () => {
  it("returns the expected local data", async () => {
    const data = await getLatestData(config.backend)
    expect(data).toEqual({ recipes })
  })
})
