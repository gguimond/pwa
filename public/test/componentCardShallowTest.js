import React from 'react';
import Card from '../js/components/card';
import { shallow } from 'enzyme'

describe('card component', () => {
  const setup = () => {
    const props = {
      card : { title : "title", content : "content"},
      updateCard : jest.fn(),
      updateCardFromServer : jest.fn()
    };
    const component = shallow(
      <Card {...props}/>
    );
    return {
      props,
      component
    } 
  }
  it('should render component', () => {
    const { props, component } = setup()
    expect(component.find('.mdl-card__title-text').text()).toBe('title')
    expect(component.find('.mdl-card__supporting-text').text()).toBe('content')
  })

  it('should call updateCard', () => {
    const { props, component } = setup()
    component.find('.mdl-button').at(0).simulate('click');
    expect(props.updateCard.mock.calls.length).toBe(1);
  })  

  it('should call updateCardFromServer', () => {
    const { props, component } = setup()
    component.find('.mdl-button').at(1).simulate('click');
    expect(props.updateCardFromServer.mock.calls.length).toBe(1);
  })  
});