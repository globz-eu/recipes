import { postToUrl } from "./requests"

export default async (data, backend, updateData) => {
  await postToUrl(backend, data)
  updateData()
}
