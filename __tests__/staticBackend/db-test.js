import Database from "../../src/staticBackend/db"
import recipes from "../../testData/recipes.json"

let db

beforeEach(async () => {
  db = new Database()
})

afterEach(() => {
  db.delete()
})

describe("addRecipe", () => {
  it("should add a recipe to indexedDB when the db is empty", async () => {
    await db.addRecipe(recipes[0])
    const recipe = await db.recipes.toArray()
    expect(recipe[0]).toEqual(recipes[0])
  })

  it("should add a recipe to indexedDB when there is already a reicpe in the db", async () => {
    await db.recipes.add(recipes[0])
    await db.addRecipe(recipes[1])
    const recipe = await db.recipes.toArray()
    expect(recipe[1]).toEqual(recipes[1])
  })

  it(
    "should raise an error when attempting to add a recipe with an id that is already present",
    async () => {
      await db.recipes.bulkAdd(recipes)
      await expect(db.addRecipe(recipes[0]))
        .rejects
        .toThrowError("ConstraintError")
    }
  )
})

describe("addRecipes", () => {
  it("should add recipes to the db when the db is empty", async () => {
    await db.addRecipes(recipes)
    const storedRecipes = await db.recipes.toArray()
    expect(storedRecipes).toEqual(recipes)
  })

  it(
    "should raise an error when attempting to add a recipes with ids that are already present",
    async () => {
      await db.recipes.bulkAdd(recipes)
      await expect(db.addRecipes(recipes))
        .rejects
        .toThrowError("ConstraintError")
    }
  )
})
