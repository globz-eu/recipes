import { rest } from "msw"
import { server, config } from "../mockApi/api"
import getConfig from "../src/getConfig"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getConfig", () => {
  it("returns the expected config", async () => {
    const data = await getConfig()
    expect(data).toEqual(config)
  })

  it("returns an error when config is not found", async () => {
    server.use(
      rest.get("/config.json", (req, res, ctx) => res.once(
        ctx.status(404),
      )),
    )
    await expect(getConfig()).rejects.toThrow("Could not get config.json, Error: 404")
  })
})
