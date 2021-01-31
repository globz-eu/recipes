import { Dexie } from "dexie"

export default class Database extends Dexie {
  constructor(namespace) {
    super(Database.dbName(namespace))

    this.version(1).stores({
      recipes: "id",
    })

    this.recipes = this.table("recipes")
  }

  addRecipe(recipe) {
    return this.recipes.add(recipe)
  }

  addRecipes(recipes) {
    return this.recipes.bulkAdd(recipes)
  }

  getRecipes() {
    return this.recipes.toArray()
  }

  static dbName(namespace) {
    return namespace !== undefined ?
      `recipe_db_${namespace}` :
      "recipe_db"
  }
}
