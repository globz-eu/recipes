import submit from "../src/staticBackend/submit"
import { config } from "../mockApi/staticApi"
import recipes from "../testData/recipes.json"
import newRecipe from "../testData/newRecipe.json"

describe("submit static", () => {
  it("should store the new data", async () => {
    const formData = newRecipe
    const mockSetData = jest.fn(data => data)
    submit({ formData, config, recipes, setData: mockSetData })
    expect(mockSetData.mock.calls[0][0]).toStrictEqual({
      config,
      recipes: [...recipes, newRecipe]
    })
  })
})
