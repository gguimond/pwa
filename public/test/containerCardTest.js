import React from 'react';
import { Card } from '../js/containers/card';
import { mount } from 'enzyme'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from '../js/reducers/card';
import configureMockStore from 'redux-mock-store'
import xhr from 'xhr'
import xhrMock from 'xhr-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (fakeStore = false) => {
    global.componentHandler = {}
    global.componentHandler.upgradeElement = jest.fn()
    let store;
    if(fakeStore){
      store = mockStore({title : 'title', content : 'content'})
    }else{
      store = createStore(reducer, applyMiddleware(thunk));
    }
    const component = mount(
      <Provider store={store}>
        <Card/>
      </Provider>
    );
    return {
      component
    } 
  }

describe('card component', () => {
  it('should render component', () => {
    const {component} = setup(true)
    expect(global.componentHandler.upgradeElement.mock.calls.length).toBe(1)
    expect(component.find('.mdl-card__title-text').text()).toBe('title')
    expect(component.find('.mdl-card__supporting-text').text()).toBe('content')
  })

  it('should update component with default value', () => {
    const {component} = setup()
    expect(global.componentHandler.upgradeElement.mock.calls.length).toBe(1)
    component.find('.mdl-button').at(0).simulate('click');
    expect(component.find('.mdl-card__title-text').text()).toBe('default title')
    expect(component.find('.mdl-card__supporting-text').text()).toBe('default content')
  })

  it('should update component', () => {
    const {component} = setup()
    expect(global.componentHandler.upgradeElement.mock.calls.length).toBe(1)
    xhr.XMLHttpRequest = xhrMock.XMLHttpRequest
    xhrMock.get('/json/data.json', function(req, res) {
      return res
      .status(200)
      .header('Content-Type', 'application/json')
      .body(JSON.stringify({data: { title : 'title', content : 'content'}}));
    });
    component.find('.mdl-button').at(1).simulate('click');
    setTimeout(function(){ 
       expect(component.find('.mdl-card__title-text').text()).toBe('title')
      expect(component.find('.mdl-card__supporting-text').text()).toBe('content')
    }, 100)
  })
});