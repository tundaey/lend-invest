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