import { getFromUrl } from "./requests"

export default async () => {
  const response = await getFromUrl("config.json")
  if (response.status === 200) {
    return response.data
  } else {
    throw new Error(`Could not get config.json, Error: ${response.status}`)
  }
}
