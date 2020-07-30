import { postToUrl } from "./requests"
import getLatestData from "./getLatestData"

export async function submit(formData, backend, setData) {
  await postToUrl(backend, formData)
  const updatedData = await getLatestData()
  setData(updatedData)
}

export function submitLocal(formData, config, recipes, setData) {
  setData({ config, recipes: [...recipes, formData] })
}
