import { putToUrl } from "../requests"
import getLatestData from "./getLatestData"

export default async ({
  id,
  formData,
  config,
  setData,
  setRecipe,
  getAccessTokenSilently = null
}) => {
  let accessToken = null
  if (config.auth0) {
    accessToken = await getAccessTokenSilently({
      audience: config.auth0Audience,
      scope: "read:recipes create:recipes update:recipes",
    })
  }
  const updatedRecipe = { ...formData }
  const response = await putToUrl(`${config.backend}/${id}`, updatedRecipe, accessToken)
  if (response.status === 204) {
    const updatedData = await getLatestData({ backend: config.backend, accessToken })
    setData(updatedData)
    setRecipe(updatedRecipe)
  } else {
    throw new Error(response.status)
  }
}
