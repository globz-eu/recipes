import { getFromUrl } from "../requests"

export default async (backend, accessToken = null) => {
  const index = await getFromUrl(`${backend}/index.json`, accessToken)
  const recipesResponses = await Promise.all(index.data.map(file => getFromUrl(`${backend}/${file}`, accessToken)))
  return { recipes: recipesResponses.map(response => response.data) }
}
