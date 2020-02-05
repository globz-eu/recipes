import { getFromUrl } from "./requests"

export default async function updateData(setData) {
  const data = await getData()
  console.log(data)
  setData(data)
}

export async function getData() {
  const config = await getFromUrl("config.json")
  const response = await getFromUrl(config.backend)
  return { config, recipes: response }
}
