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
  try {
    const response = await axios.post(
      url,
      data,
      accessToken != null
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {}
    )
    return response
  } catch (error) {
    return error.response
  }
}

export async function putToUrl(url, data, accessToken = null) {
  try {
    const response = await axios.put(
      url,
      data,
      accessToken != null
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : {}
    )
    return response
  } catch (error) {
    return error.response
  }
}
