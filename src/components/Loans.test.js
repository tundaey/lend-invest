import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import {loans} from '../current-loan.json'
import Loans from './Loans'
import SingleLoan from './SingleLoan'

test('Loans component renders correctly with list of loans', ()=> {
    const wrapper = shallow(<Loans loans={loans}/>)
    const element = wrapper.find(SingleLoan)
    const firstLoanId = loans[0].id
    expect(element.length).toBe(3)
    expect(element.get(0).props.loan.id).toBe(firstLoanId)
})