import axios from "axios"

export async function getFromUrl(url, accessToken = null) {
  try {
    const response = await axios.get(
      url,
      accessToken != null
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {}
    )
    return response
  } catch (error) {
    return error.response
  }
}

export async function postToUrl(url, data, accessToken = null) {
  const response = await axios.post(
    url,
    data,
    accessToken != null
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {}
  ).catch(error => new Error(error))
  if (response instanceof Error) {
    console.error(response)
    return null
  }
  return response.data
}
