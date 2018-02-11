import React from 'react'
import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'

import NavBar from './NavBar'

const title = 'Lend-Invest'

test('NavBar renders properly', ()=> {
    const wrapper = shallow(<NavBar title={title}/>)
    const element = wrapper.find('span');
    expect(element.length).toBe(1);
    expect(element.get(0).props.children).toBe(title) 
})

test('Navbar component renders a snapshot properly', ()=>{
    const tree = renderer.create(<NavBar title={title}/>).toJSON();
    expect(tree).toMatchSnapshot(); 
})