import { getFromUrl } from "./requests"

export default async (config, accessToken) => {
  if (config.backend === "static") {
    const index = await getFromUrl(`${config.recipesData}/index.json`)
    const recipes = await Promise.all(index.map(file => getFromUrl(`${config.recipesData}/${file}`)))
    return { config, recipes }
  }
  const response = await getFromUrl(config.backend, accessToken)
  return { config, recipes: response }
}
