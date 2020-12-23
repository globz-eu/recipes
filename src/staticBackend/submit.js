export default ({ formData, config, setData, recipes }) => {
  setData({ config, recipes: [...recipes, formData] })
}
