import { postToUrl } from "../requests"
import getLatestData from "./getLatestData"

export default async ({ formData, config, setData, getAccessTokenSilently = null }) => {
  let accessToken = null
  if (config.auth0) {
    accessToken = await getAccessTokenSilently({
      audience: config.auth0Audience,
      scope: "read:recipes create:recipes update:recipes",
    })
  }
  await postToUrl(config.backend, formData, accessToken)
  const updatedData = await getLatestData(config.backend, accessToken)
  setData(updatedData)
}
