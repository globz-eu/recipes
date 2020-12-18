import { server, config } from "../mockApi/authApi"
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
    const data = await getLatestData({ ...config, accessToken: "accessToken" })
    expect(data).toEqual({ recipes })
  })

  it("returns an error when unauthorized", async () => {
    await expect(
      getLatestData({ ...config, accessToken: "invalidAccessToken" })
    ).rejects.toThrowError("403")
  })
})
