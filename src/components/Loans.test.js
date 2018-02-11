import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import {loans} from '../current-loans.json'
import Loans from './Loans'
import SingleLoan from './SingleLoan'

test('User should be able to see all current loans', ()=> {
    const wrapper = shallow(<Loans loans={loans}/>)
    const element = wrapper.find(SingleLoan)
    const firstLoanId = loans[0].id
    expect(element.length).toBe(3)
    expect(element.get(0).props.loan.id).toBe(firstLoanId)
})

test('Loans component renders a snapshot properly', ()=>{
    const tree = renderer.create(<Loans loans={loans}/>).toJSON();
    expect(tree).toMatchSnapshot(); 
})