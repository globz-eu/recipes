import { server, config } from "../mockApi/api"
import getLatestData from "../src/getLatestData"
import recipes from "../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getLatestData", () => {
  it("returns the expected API data", async () => {
    const data = await getLatestData(config, "accessToken")
    expect(data).toEqual({ config, recipes })
  })
})
