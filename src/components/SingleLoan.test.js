import React from 'react'
import { shallow, mount } from 'enzyme'
import renderer from 'react-test-renderer'
import {spy} from 'sinon'

import {loans} from '../current-loans.json'
import SingleLoan from './SingleLoan'
import App from '../App'
import Loans from './Loans'

test('Ensure SingleLoan component renders correctly with the details of the loan', ()=> {
    const onClick = jest.fn()
    const wrapper = shallow(<SingleLoan onClick={onClick} loan={loans[0]}/>)
    const element = wrapper.find('tr')
    expect(element.length).toBe(1)
    expect(element.get(0).props.children.length).toBe(8)
    expect(element.get(0).props.children[0].props.children).toBe(loans[0].id)
    expect(element.get(0).props.children[1].props.children).toBe(loans[0].title)
    expect(element.get(0).props.children[2].props.children).toBe(loans[0].tranche)
    expect(element.get(0).props.children[3].props.children).toBe(loans[0].available)
    expect(element.get(0).props.children[4].props.children).toBe(loans[0].annualised_return)
    expect(element.get(0).props.children[5].props.children).toBe(loans[0].term_remaining)
    expect(element.get(0).props.children[6].props.children).toBe(loans[0].ltv)
    expect(element.get(0).props.children[7].props.children).toBe(loans[0].amount)
})

test('Ensure the modal is opened when a single loan is clicked', ()=> {
    const loansComponent = mount(<App/>)
    const spy = jest.spyOn(loansComponent.instance(), 'openModal');

    const wrapper = mount(<SingleLoan onClick={spy} key={loans[0].id}  loan={loans[0]}/>)
    wrapper.find('tr').simulate('click')
    const loan = loans[0]

    expect(loansComponent.instance().state.isModalOpen).toBe(true)
    expect(loansComponent.instance().state.selectedLoan).toBe(loan)
})

test('SingleLoan component renders a snapshot properly', ()=>{
    const tree = renderer.create(<SingleLoan loan={loans[0]} />).toJSON();
    expect(tree).toMatchSnapshot(); 
})
