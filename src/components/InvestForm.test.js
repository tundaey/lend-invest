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

test('Ensure the modal is closed when the invest button is called', ()=> {
    const AppComponent = mount(<App/>)
    const spy = jest.spyOn(AppComponent.instance(), 'processInvestment');
    AppComponent.instance().setState({isModalOpen: true})

    const loan = loans[0]
    const show = true
    const wrapper = mount(<InvestForm selectedLoan={loan} processInvestment={spy} show={show}/>)
    const investButton = wrapper.find('#investButton').first()

    investButton.simulate('click')
    expect(investButton.length).toBe(1)
    expect(AppComponent.instance().state.isModalOpen).toBe(false)
})

test('Ensure the available amount for the loan selected decreases by the right amount when invest button is clicked', ()=> {
    const AppComponent = mount(<App/>)
    const spy = jest.spyOn(AppComponent.instance(), 'processInvestment');
    AppComponent.instance().setState({isModalOpen: true})
    const currentAvailable = AppComponent.instance().state.loans[0].available

    const show = true
    const loan = loans[0]
    const wrapper = mount(<InvestForm selectedLoan={loan} processInvestment={spy} show={show}/>)

    const investInputField = wrapper.find(FormControl)
    const investButton = wrapper.find('#investButton').first()
    investInputField.simulate('change', {target: {
       name: 'investment',
       value: 50 
    }})

    investButton.simulate('click')

    const selectedLoan = wrapper.props().selectedLoan
    expect(wrapper.instance().state.investment).toBe(50)
    expect(parseFloat(selectedLoan.available.replace(/,/g, ''))).toBeLessThan(parseFloat(currentAvailable.replace(/,/g, '')))
    
})

test('Ensure the total possible investments decreases when an investment is made', ()=> {
    const AppComponent = mount(<App/>)
    const spy = jest.spyOn(AppComponent.instance(), 'processInvestment');
    AppComponent.instance().setState({isModalOpen: true})
    const possibleInvestments = AppComponent.instance().state.possibleInvestments
    console.log('possble investments', AppComponent.instance().state.possibleInvestments.length)

    const show = true
    const loan = loans[0]
    const wrapper = mount(<InvestForm selectedLoan={loan} processInvestment={spy} show={show}/>)

    const investInputField = wrapper.find(FormControl)
    const investButton = wrapper.find('#investButton').first()
    investInputField.simulate('change', {target: {
       name: 'investment',
       value: 50 
    }})

    investButton.simulate('click')

    const selectedLoan = wrapper.props().selectedLoan
    expect(wrapper.instance().state.investment).toBe(50)
    expect(AppComponent.instance().state.possibleInvestments.length).toBeLessThan(possibleInvestments.length)
})