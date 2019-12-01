import axios from "axios"

export default async function updateData(setData) {
  const data = await getData()
  console.log(data)
  setData(data)
}

export async function getData() {
  const config = await getFromUrl("config.json")
  const response = await getFromUrl(config.backend)
  return response
}

export async function getFromUrl(url) {
  const response = await axios.get(url).catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
    return null
  }
  return response.data
}
