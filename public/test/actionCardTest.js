import * as actions from '../js/actions/card'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import xhr from 'xhr'
import xhrMock from 'xhr-mock'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should create an action to update a card', () => {
    const card = { title : 'title', content : 'content'}
    const expectedAction = {
      type: 'UPDATE_CARD',
      payload: {
        title : card.title, 
        content : card.content
        }
    }
    expect(actions.updateCard(card)).toEqual(expectedAction)
  })
  it('should create an action to update a card from server', () => {
    xhr.XMLHttpRequest = xhrMock.XMLHttpRequest
    xhrMock.get('/json/data.json', function(req, res) {
      return res
      .status(200)
      .header('Content-Type', 'application/json')
      .body(JSON.stringify({data: { title : 'title', content : 'content'}}));
    });
    const store = mockStore({title : 'default title', content : 'default content'})
    const card = { title : 'title', content : 'content'}
    const expectedAction = {
      type: 'UPDATE_CARD',
      payload: {
        title : card.title, 
        content : card.content
        }
    }
    store.dispatch(actions.updateCardFromServer())
    setTimeout(function(){ expect(store.getActions()).toEqual(expectedAction) }, 100)
  })
})