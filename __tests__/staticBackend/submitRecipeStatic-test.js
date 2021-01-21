import submit from "../../src/staticBackend/submit"
import { config } from "../../mockApi/staticApi"
import recipes from "../../testData/recipes.json"

beforeEach(() => {
  sessionStorage.setItem("recipes", JSON.stringify(recipes))
})

afterEach(() => {
  sessionStorage.clear()
})

describe("submit static", () => {
  it("should update the current recipe in sessionStorage", () => {
    const recipe = recipes[0]
    const formData = { ...recipe.recipe, name: "Lekkerrer" }
    const mockSetData = jest.fn(data => data)
    const mockSetRecipe = jest.fn(r => r)
    submit({ id: 0, formData, config, setData: mockSetData, setRecipe: mockSetRecipe })
    const storedRecipes = JSON.parse(sessionStorage.getItem("recipes"))
    expect(storedRecipes.find(r => r.recipe.id === 0).recipe).toEqual({ ...formData, id: 0 })
  })

  it("should update the current recipe in app", () => {
    const recipe = recipes[0]
    const formData = { ...recipe.recipe, name: "Lekkerrer" }
    const mockSetData = jest.fn(data => data)
    const mockSetRecipe = jest.fn(r => r)
    submit({ id: 0, formData, config, setData: mockSetData, setRecipe: mockSetRecipe })
    expect(mockSetRecipe.mock.calls[0][0].recipe).toEqual(formData)
  })

  it("should update the recipe list in app", () => {
    const recipe = recipes[0]
    const formData = { ...recipe, name: "Lekkerrer" }
    const storedRecipes = JSON.parse(sessionStorage.getItem("recipes"))
    const updatedRecipes = [
      ...storedRecipes.filter(r => r.recipe.id !== 0),
      { recipe: { ...formData, id: 0 } }
    ]
    const updatedRecipeList = updatedRecipes.map(r => ({ id: r.recipe.id, name: r.recipe.name }))
    const updatedData = { config, recipes: updatedRecipeList }
    const mockSetData = jest.fn(data => data)
    const mockSetRecipe = jest.fn(r => r)
    submit({ id: 0, formData, config, setData: mockSetData, setRecipe: mockSetRecipe })
    expect(mockSetData.mock.calls[0][0]).toEqual(updatedData)
  })
})
