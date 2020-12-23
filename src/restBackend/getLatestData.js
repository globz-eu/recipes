import { getFromUrl } from "../requests"

export default async (backend, accessToken = null) => {
  const response = await getFromUrl(backend, accessToken)
  if (response.status === 200) {
    return { recipes: response.data }
  } else {
    throw new Error(response.status)
  }
}
