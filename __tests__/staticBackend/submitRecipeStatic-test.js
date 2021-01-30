import submit from "../../src/staticBackend/submit"
import { config } from "../../mockApi/staticApi"
import recipes from "../../testData/recipes.json"
import Database from "../../src/staticBackend/db"

let db

beforeEach(async () => {
  db = new Database()
  await db.addRecipes(recipes)
})

afterEach(() => {
  db.delete()
})

describe("submit static", () => {
  it("should update the current recipe in indexedDB", async () => {
    const recipe = recipes[0]
    const formData = { ...recipe, name: "Lekkerrer" }
    const mockSetData = jest.fn(data => data)
    const mockSetRecipe = jest.fn(r => r)
    await submit({ id: 0, db, formData, config, setData: mockSetData, setRecipe: mockSetRecipe })
    const storedRecipes = await db.recipes.toArray()
    expect(storedRecipes.find(r => r.id === 0)).toEqual({ ...formData, id: 0 })
  })

  it("should update the current recipe in app", async () => {
    const recipe = recipes[0]
    const formData = { ...recipe, name: "Lekkerrer" }
    const mockSetData = jest.fn(data => data)
    const mockSetRecipe = jest.fn(r => r)
    await submit({ id: 0, db, formData, config, setData: mockSetData, setRecipe: mockSetRecipe })
    expect(mockSetRecipe.mock.calls[0][0]).toEqual(formData)
  })

  it("should update the recipe list in app", async () => {
    const recipe = recipes[0]
    const formData = { ...recipe, name: "Lekkerrer" }
    const storedRecipes = await db.recipes.toArray()
    const updatedRecipes = [
      ...storedRecipes.filter(r => r.id !== 0),
      { ...formData, id: 0 }
    ]
    const updatedRecipeList = updatedRecipes.map(r => ({ id: r.id, name: r.name }))
    const updatedData = { config, recipes: updatedRecipeList }
    const mockSetData = jest.fn(data => data)
    const mockSetRecipe = jest.fn(r => r)
    await submit({ id: 0, db, formData, config, setData: mockSetData, setRecipe: mockSetRecipe })
    expect(mockSetData.mock.calls[0][0]).toEqual(updatedData)
  })
})
