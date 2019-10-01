import React from "react"
import {shallow} from "enzyme"
import App from "../src/app"

test('App text is correct', () => {
    const app = shallow(<App />)
    expect(app.text()).toEqual('Recipes')
})
