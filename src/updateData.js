import { getFromUrl } from "./requests"

export default async function updateData(setData) {
  const data = await getData()
  console.log(data)
  setData(data)
}

export async function getData() {
  const config = await getFromUrl("config.json")
  if (config.backend === "local") {
    const index = await getFromUrl(`${config.recipesData}/index.json`)
    const recipes = await Promise.all(index.map(file => getFromUrl(`${config.recipesData}/${file}`)))
    return { config, recipes }
  }
  const response = await getFromUrl(config.backend)
  return { config, recipes: response }
}
