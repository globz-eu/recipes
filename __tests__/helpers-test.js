import processData from "../src/helpers"
import testRecipes from "../testData/recipes.json"
import testResponse from "../testData/responseData.json"

test('App renders correct number of title components', () => {
  const processedData = processData(testResponse)
  expect(processedData).toEqual(testRecipes)
})
