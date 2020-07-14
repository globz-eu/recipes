import { getFromUrl } from "./requests"

export default async function updateData(setData) {
  const data = await getData()
  console.log(data)
  setData(data)
}

export async function getData() {
  const config = await getFromUrl("config.json")
  if (config.backend === "local") {
    const response = await getFromUrl("data/recipes.json")
    return { config, recipes: response }
  }
  const response = await getFromUrl(config.backend)
  return { config, recipes: response }
}
