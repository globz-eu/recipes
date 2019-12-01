import App from "../src/app"
import Instructions from "../src/components/instructions"
import Servings from "../src/components/servings"
import Title from "../src/components/title"
import testRecipes from "../testData/recipes.json"
import updateData from "../src/updateData"

jest.mock("updateData")

describe("App", () => {
  it("title components have expected title", () => {
    const app = shallow(<App />)
    const titles = app.find(Title)
    titles.map((title, i) => expect(title).toHaveProp('title', testRecipes[i].name))
  })
  
  it("servings components have expected content", () => {
    const app = shallow(<App />)
    const servings = app.find(Servings)
    servings.map((serving, i) => expect(serving).toHaveProp('servings', testRecipes[i].servings))
  })
  
  it("instructions components have expected content", () => {
    const app = shallow(<App />)
    const instructions = app.find(Instructions)
    instructions.map((instruction, i) => expect(instruction).toHaveProp('instructions', testRecipes[i].instructions))
  })
})
