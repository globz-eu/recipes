import { rest } from "msw"
import { setupServer } from "msw/node"
import recipes from "../testData/recipes.json"

export const config = {
  backend: "recipes-data",
  backendType: "static"
}

export const server = setupServer(
  rest.get("/config.json", (req, res, ctx) => res(
    ctx.json(config), ctx.status(200),
  )),
  rest.get("/recipes-data/index.json", (req, res, ctx) => res(
    ctx.json([
      { path: "data/lekker.json", name: "Lekker", id: 0 },
      { path: "data/pas_mal.json", name: "Pas mal", id: 1 }
    ]),
    ctx.status(200),
  )),
  rest.get("/recipes-data/data/lekker.json", (req, res, ctx) => res(
    ctx.json(recipes[0]),
    ctx.status(200),
  )),
  rest.get("/recipes-data/data/pas_mal.json", (req, res, ctx) => res(
    ctx.json(recipes[1]),
    ctx.status(200),
  )),
)
