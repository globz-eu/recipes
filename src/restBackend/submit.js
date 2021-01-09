import { putToUrl } from "../requests"
import getLatestData from "./getLatestData"

export default async ({ id, formData, config, setData, getAccessTokenSilently = null }) => {
  let accessToken = null
  if (config.auth0) {
    accessToken = await getAccessTokenSilently({
      audience: config.auth0Audience,
      scope: "read:recipes create:recipes update:recipes",
    })
  }
  const updatedRecipe = { recipe: formData }
  const response = await putToUrl(`${config.backend}/${id}`, updatedRecipe, accessToken)
  if (response.status === 204) {
    const updatedData = await getLatestData(config.backend, accessToken)
    setData(updatedData)
  } else {
    throw new Error(response.status)
  }
}
