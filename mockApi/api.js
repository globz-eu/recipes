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
        ({ id: recipe.id, name: recipe.name })
    )
    return (
      res(
        ctx.json(recipesNames), ctx.status(200)
      )
    )
  }),
  rest.get(`${config.backend}/:id`, (req, res, ctx) => {
    const { id } = req.params
    const recipePerId = recipes.find(recipe => recipe.id === Number(id))
    return (
      res(
        ctx.json({ ...recipePerId }), ctx.status(200)
      )
    )
  }),
  rest.put(`${config.backend}/:id`, (req, res, ctx) =>
    res(
      ctx.json({ ...req.body }), ctx.status(204)
    )
  ),
  rest.post(config.backend, (req, res, ctx) => res(
    ctx.json(newRecipe), ctx.status(201)
  )),
)
