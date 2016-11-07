import React from 'react';
import Card from '../js/components/card';
import renderer from 'react-test-renderer';

describe('card component', () => {
  global.componentHandler = {}
  global.componentHandler.upgradeElement = jest.fn()
  it('should render component', () => {
    const props = { title : "title", content : "content" };
    const component = renderer.create(
      <Card card={props}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(global.componentHandler.upgradeElement.mock.calls.length).toBe(1)
  })
});