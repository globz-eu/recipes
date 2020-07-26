import { postToUrl } from "./requests"

export default async (formData, data, updateData, setData) => {
  console.log([...data.recipes, formData])
  if (data.config.backend !== "local") {
    await postToUrl(data.config.backend, formData)
    updateData(setData)
  } else {
    setData({ config: data.config, recipes: [...data.recipes, formData] })
  }
}
