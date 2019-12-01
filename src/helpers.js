import axios from "axios"

export async function getData(setData) {
  const config = await getFromUrl("config.json")
  const response = await getFromUrl(config.backend)
  console.log(response)
  setData(response)
}

export async function getFromUrl(url) {
  const response = await axios.get(url).catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
    return null
  }
  return response.data
}
