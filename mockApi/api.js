import { rest } from "msw"
import { setupServer } from "msw/node"
import recipes from "../testData/recipes.json"
import newRecipe from "../testData/newRecipe.json"

export const config = { backend: "https://recipes.eu/recipes" }

export const server = setupServer(
  rest.get("/config.json", (req, res, ctx) => res(
    ctx.json(config), ctx.status(200),
  )),
  rest.get(config.backend, (req, res, ctx) => {
    const recipesNames = recipes.map(
      recipe =>
        ({ id: recipe.recipe.id, name: recipe.recipe.name })
    )
    return (
      res(
        ctx.json(recipesNames), ctx.status(200)
      )
    )
  }),
  rest.get(`${config.backend}/:id`, (req, res, ctx) => {
    const { id } = req.params
    const recipePerId = recipes.find(recipeObject => recipeObject.recipe.id === Number(id))
    return (
      res(
        ctx.json({ ...recipePerId }), ctx.status(200)
      )
    )
  }),
  rest.post(config.backend, (req, res, ctx) => res(
    ctx.json(newRecipe), ctx.status(201)
  )),
)
