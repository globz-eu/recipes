import { getFromUrl } from "../requests"

export default async (recipesData, accessToken = null) => {
  const index = await getFromUrl(`${recipesData}/index.json`, accessToken)
  console.log(index)
  const recipesResponses = await Promise.all(index.data.map(file => getFromUrl(`${recipesData}/${file}`, accessToken)))
  return { recipes: recipesResponses.map(response => response.data) }
}
