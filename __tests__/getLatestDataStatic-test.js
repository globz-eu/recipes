import { server, config } from "../mockApi/staticApi"
import getLatestData from "../src/getLatestData"
import recipes from "../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getLatestData", () => {
  it("returns the expected local data", async () => {
    const data = await getLatestData(config)
    expect(data).toEqual({ config, recipes })
  })
})
