import { postToUrl } from "./requests"
import getLatestData from "./getLatestData"

export async function submit(formData, config, setData, getAccessTokenSilently) {
  const accessToken = await getAccessTokenSilently({
    audience: config.auth0Audience,
    scope: "read:recipes create:recipes update:recipes",
  })
  await postToUrl(config.backend, formData, accessToken)
  const updatedData = await getLatestData(config, accessToken)
  setData(updatedData)
}

export function submitStatic(formData, config, recipes, setData) {
  setData({ config, recipes: [...recipes, formData] })
}
