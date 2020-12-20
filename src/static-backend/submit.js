export default (formData, config, recipes, setData) => {
  setData({ config, recipes: [...recipes, formData] })
}
