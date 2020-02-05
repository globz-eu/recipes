import axios from "axios"


export async function getFromUrl(url) {
  const response = await axios.get(url).catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
    return null
  }
  return response.data
}

export async function postToUrl(url, data) {
  const response = await axios.post(url, data).catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
    return null
  }
  return response.data
}
