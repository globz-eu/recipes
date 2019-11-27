import Servings from "../../src/components/servings"

test('Servings component displays servings number', () => {
    const servings = shallow(<Servings servings={ 3 } />)
    expect(servings).toHaveText("3 servings")
})
