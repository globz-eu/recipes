import App from "../src/app"
import Instructions from "../src/components/instructions"
import Servings from "../src/components/servings"
import Title from "../src/components/title"
import testRecipes from "../testData/recipes.json"

test('App renders correct number of title components', () => {
  const app = shallow(<App data={ testRecipes } />)
  expect(app).toContainMatchingElements(2, Title)
})

test("App title components have expected title", () => {
  const app = shallow(<App data={ testRecipes } />)
  const titles = app.find(Title)
  titles.map((title, i) => expect(title).toHaveProp('title', testRecipes[i].name))
})

test("App Servings components have expected content", () => {
  const app = shallow(<App data={ testRecipes } />)
  const servings = app.find(Servings)
  servings.map((serving, i) => expect(serving).toHaveProp('servings', testRecipes[i].servings))
})

test("App Instructions components have expected content", () => {
  const app = shallow(<App data={ testRecipes } />)
  const instructions = app.find(Instructions)
  instructions.map((instruction, i) => expect(instruction).toHaveProp('instructions', testRecipes[i].instructions))
})
