import { rest } from "msw"
import { setupServer } from "msw/node"
import recipes from "../testData/recipes.json"
import newRecipe from "../testData/newRecipe.json"

export const config = { backend: "https://recipes.eu/recipes" }

export const server = setupServer(
  rest.get("/config.json", (req, res, ctx) => res(
    ctx.json(config), ctx.status(200),
  )),
  rest.get(config.backend, (req, res, ctx) => res(
    ctx.json(recipes), ctx.status(200)
  )),
  rest.post(config.backend, (req, res, ctx) => res(
    ctx.json(newRecipe), ctx.status(201)
  )),
)
