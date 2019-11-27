import Instructions from "../../src/components/instructions"

test('Instructions component displays instructions text', () => {
    const instructions = shallow(<Instructions instructions="Recipe instructions" />)
    expect(instructions).toHaveText("Instructions: Recipe instructions")
})
