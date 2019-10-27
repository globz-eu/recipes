import Title from "../src/components/title"

test('Title component displays title text', () => {
    const title = shallow(<Title title="Recipe Title" />)
    expect(title).toHaveText("Recipe Title")
})
