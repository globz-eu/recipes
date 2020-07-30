import { submitStatic } from "../src/submitRecipe"
import { config } from "../mockApi/staticApi"
import recipes from "../testData/recipes.json"
import newRecipe from "../testData/newRecipe.json"

describe("submitStatic", () => {
  it("should store the new data", async () => {
    const formData = newRecipe
    const mockSetData = jest.fn(data => data)
    submitStatic(formData, config, recipes, mockSetData)
    expect(mockSetData.mock.calls[0][0]).toStrictEqual({
      config,
      recipes: [...recipes, newRecipe]
    })
  })
})
