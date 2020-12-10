import { submitStatic, submit } from "./submitRecipe"

export default ({ config, recipes, setData, getAccessTokenSilently }) => {
  if (config.backend === "static") {
    return formData => submitStatic(formData, config, recipes, setData)
  } else {
    if (config.requireAuthentication) {
      return formData => submit(formData, config, setData, getAccessTokenSilently)
    } else {
      return formData => submit(formData, config, setData)
    }
  }
}
