import React from "react"
import { shallow } from "enzyme"
import useForm from "../src/formHook"

function HookWrapper(props) {
  const hook = props.hook ? props.hook() : undefined
  return <div hook={ hook } />
}

describe("useForm hook", () => {
  it("wrapper should render", () => {
    const wrapper = shallow(<HookWrapper />)

    expect(wrapper.exists()).toBeTruthy()
  })

  it("should set initial value", () => {
    const wrapper = shallow(<HookWrapper hook={ () => useForm(() => {}) } />)
    const { hook } = wrapper.find("div").props()
    const { inputs } = hook
    expect(inputs).toEqual({})
  })

  it("should set values on change", () => {
    const wrapper = shallow(<HookWrapper hook={ () => useForm(() => {}) } />)
    const { handleInputChange } = wrapper.find("div").props().hook
    handleInputChange({ target: { name: "title", value: "new" }, persist: () => {} })
    const { inputs } = wrapper.find("div").props().hook
    expect(inputs).toEqual({ title: "new" })
  })
})
