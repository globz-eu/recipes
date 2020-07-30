import { rest } from "msw"
import { server, config } from "../mockApi/api"
import newRecipe from "../testData/newRecipe.json"
import { getFromUrl, postToUrl } from "../src/requests"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("getFromUrl", () => {
  it("returns the correct data", async () => {
    const response = await getFromUrl("config.json")
    expect(response).toEqual(config)
  })

  it("catches errors", async () => {
    server.use(
      rest.get("/config.json", (req, res, ctx) => res.once(
        ctx.status(404),
      )),
    )
    const response = await getFromUrl("config.json")
    expect(response).toEqual(null)
  })
})

describe("postToUrl", () => {
  it("returns the expected response", async () => {
    const response = await postToUrl(config.backend, newRecipe)
    expect(response).toEqual(newRecipe)
  })

  it("catches errors", async () => {
    server.use(
      rest.post(config.backend, (req, res, ctx) => res.once(
        ctx.status(400)
      ))
    )
    const response = await postToUrl(config.backend, newRecipe)
    expect(response).toEqual(null)
  })
})
