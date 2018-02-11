import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Loans from './components/Loans'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('App renders correctly with the Loans Components', ()=> {
  const wrapper = shallow(<App/>)
  const element = wrapper.find(Loans)
  const title = wrapper.find('h1')
  const possibleInvestments = wrapper.find('h3')
  expect(element.length).toBe(1)
  expect(possibleInvestments.length).toBe(1)
  expect(title.length).toBe(1)
})

test('User is able to see the number representing the total amount of possible investments.', ()=> {
  const wrapper = shallow(<App/>)
  const possibleInvestments = wrapper.instance().state.possibleInvestments.length
  const element = wrapper.find(Loans)
  const possibleInvestmentsContainer = wrapper.find('span')
  expect(possibleInvestmentsContainer.length).toBe(1)
  expect(wrapper.contains(<span>{possibleInvestments}</span>)).toBe(true);
  
})
