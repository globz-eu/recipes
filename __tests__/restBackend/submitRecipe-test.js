import { rest } from "msw"
import { server, config } from "../../mockApi/api"
import submit from "../../src/restBackend/submit"
import recipes from "../../testData/recipes.json"

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe("submit", () => {
  it("should update the recipe list in the app", async () => {
    const recipe = recipes[0]
    const recipeList = recipes.map(r => ({ id: r.recipe.id, name: r.recipe.name }))
    const formData = { ...recipe.recipe, name: "Lekkerrer" }
    const updatedRecipeList = [
      ...recipeList.filter(r => r.id !== 0),
      { name: formData.name, id: 0 }
    ]
    const mockSetData = jest.fn(data => data)
    const mockSetRecipe = jest.fn(r => r)
    const mockGetAccessTokenSilently = jest.fn(() => "accessToken")
    server.use(
      rest.get(config.backend, (req, res, ctx) => res.once(
        ctx.json(updatedRecipeList), ctx.status(200)
      ))
    )
    await submit({
      id: 0,
      formData,
      config,
      setData: mockSetData,
      setRecipe: mockSetRecipe,
      getAccessTokenSilently: mockGetAccessTokenSilently
    })
    expect(mockSetData.mock.calls[0][0]).toStrictEqual({ recipes: updatedRecipeList })
  })

  describe("submit", () => {
    it("should update the current recipe in the app", async () => {
      const recipe = recipes[0]
      const recipeList = recipes.map(r => ({ id: r.recipe.id, name: r.recipe.name }))
      const formData = { ...recipe.recipe, name: "Lekkerrer" }
      const updatedRecipeList = [
        ...recipeList.filter(r => r.id !== 0),
        { name: formData.name, id: 0 }
      ]
      const mockSetData = jest.fn(data => data)
      const mockSetRecipe = jest.fn(r => r)
      const mockGetAccessTokenSilently = jest.fn(() => "accessToken")
      server.use(
        rest.get(config.backend, (req, res, ctx) => res.once(
          ctx.json(updatedRecipeList), ctx.status(200)
        ))
      )
      await submit({
        id: 0,
        formData,
        config,
        setData: mockSetData,
        setRecipe: mockSetRecipe,
        getAccessTokenSilently: mockGetAccessTokenSilently
      })
      expect(mockSetRecipe.mock.calls[0][0].recipe).toEqual(formData)
    })
  })
})
