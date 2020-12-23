import { rest } from "msw"
import { server, config } from "../mockApi/api"
import submit from "../src/restBackend/submit"
import recipes from "../testData/recipes.json"
import newRecipe from "../testData/newRecipe.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("submit", () => {
  it("should submit the recipe passed from the form", async () => {
    const formData = newRecipe
    const mockSetData = jest.fn(data => data)
    const mockGetAccessTokenSilently = jest.fn(() => "accessToken")
    server.use(
      rest.get(config.backend, (req, res, ctx) => res.once(
        ctx.json([...recipes, newRecipe]), ctx.status(200)
      ))
    )
    await submit({
      formData,
      config,
      setData: mockSetData,
      getAccessTokenSilently: mockGetAccessTokenSilently
    })
    expect(mockSetData.mock.calls[0][0]).toStrictEqual({ recipes: [...recipes, newRecipe] })
  })
})
