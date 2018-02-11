import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import {loans} from '../current-loans.json'

import InvestForm from './InvestForm'
import SingleLoan from './SingleLoan'
import {Modal, Button, FormControl, Badge} from 'react-bootstrap'
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

test('User can close popup when the cancel button is called', ()=> {
    const AppComponent = mount(<App/>)
    const spy = jest.spyOn(AppComponent.instance(), 'closeModal');

    const show = true
    const wrapper = mount(<InvestForm closeModal={spy} show={show} />)
    const cancelButton = wrapper.find('#cancelButton').first()

    cancelButton.simulate('click')
    expect(cancelButton.length).toBe(1)
    expect(AppComponent.instance().state.isModalOpen).toBe(false)
})

test('User can put numeric value (invested amount) in the input', ()=> {
    const show = true
    const wrapper = shallow(<InvestForm show={show}/>)
    const investInputField = wrapper.find(FormControl)
    investInputField.simulate('change', {target: {
       name: 'investment',
       value: 50 
    }})
    
    expect(typeof wrapper.instance().state.investment).toBe("number")
    expect(wrapper.instance().state.investment).toBe(50)

})

test('User can click button labelled “Invest” which closes pop up', ()=> {
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

test('When the "Invest" button is clicked, the available amount, for the loan User invested into, should decrease', ()=> {
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

test('When the "Invest" button is clicked, the total available number of investments should also adjust accordingly', ()=> {
    const AppComponent = shallow(<App/>)
    const spy = jest.spyOn(AppComponent.instance(), 'processInvestment');
    AppComponent.instance().setState({isModalOpen: true})
    const possibleInvestments = AppComponent.instance().state.possibleInvestments.length

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
    expect(AppComponent.instance().state.possibleInvestments.length).toBeLessThan(possibleInvestments)
})


test('Investform component renders a snapshot properly', ()=>{
    const spy = jest.fn()
    const closeModal = jest.fn()
    const show = true
    const loan = loans[0]
    const tree = renderer.create(
        <InvestForm
        processInvestment={spy} 
        closeModal={closeModal} 
        selectedLoan={loan}/>).toJSON();
    expect(tree).toMatchSnapshot(); 
})