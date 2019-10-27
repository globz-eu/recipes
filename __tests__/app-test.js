import App from "../src/app"
import Title from "../src/components/title"
import testRecipes from "../testData/recipes.json"

test('App renders correct number of title components', () => {
    const app = shallow(<App data={ testRecipes } />)
    expect(app).toContainMatchingElements(2, Title)
})

test("App title components have expected title", () =>{
    const app = shallow(<App data={ testRecipes } />)
    const titles = app.find(Title)
    titles.map((title, i) => expect(title).toHaveProp('title', testRecipes[i].name))
})
