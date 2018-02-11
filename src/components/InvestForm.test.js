import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import {loans} from '../current-loans.json'

import InvestForm from './InvestForm'
import {Modal, Button, FormControl} from 'react-bootstrap'
import App from '../App'

test('renders the invest form in the modal properly', ()=> {
    const show = true
    const wrapper = shallow(<InvestForm show={show} />)
    const input = wrapper.find(FormControl)
    const buttons = wrapper.find(Button)
    const modal = wrapper.find(Modal)
    expect(modal.length).toBe(1)
    expect(input.length).toBe(1)
    expect(buttons.length).toBe(2)

})

test('Ensure the modal is closed when the cancel button is called', ()=> {
    const AppComponent = mount(<App/>)
    const spy = jest.spyOn(AppComponent.instance(), 'closeModal');

    const show = true
    const wrapper = mount(<InvestForm closeModal={spy} show={show} />)
    const cancelButton = wrapper.find('#cancelButton').first()

    cancelButton.simulate('click')
    expect(cancelButton.length).toBe(1)
    expect(AppComponent.instance().state.isModalOpen).toBe(false)
})

test('Ensure the invest input field updates the state when the data is entered into it', ()=> {
    const show = true
    const wrapper = shallow(<InvestForm show={show}/>)
    const investInputField = wrapper.find(FormControl)
    investInputField.simulate('change', {target: {
       name: 'investment',
       value: 50 
    }})
    expect(wrapper.instance().state.investment).toBe(50)
})