import { getFromUrl } from "./requests"

export default async ({ backend, recipesData, requireAuthentication, accessToken }) => {
  if (backend === "static") {
    const index = await getFromUrl(`${recipesData}/index.json`)
    const recipes = await Promise.all(index.map(file => getFromUrl(`${recipesData}/${file}`)))
    return { recipes }
  } else {
    if (requireAuthentication) {
      const response = await getFromUrl(backend, accessToken)
      return { recipes: response }
    } else {
      const response = await getFromUrl(backend)
      return { recipes: response }
    }
  }
}
