import reducer from '../js/reducers/card'

describe('card reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(
      {title : 'default title', content : 'default content'}
    )
  })

  it('should handle UPDATE_CARD', () => {
    expect(
      reducer({}, {
        type: 'UPDATE_CARD',
        payload : {title : 'title', content : 'content'}
      })
    ).toEqual(
      {title : 'title', content : 'content'}
    )

    expect(
      reducer({title : 'default title', content : 'default content'}, {
        type: 'UPDATE_CARD',
        payload : {title : 'title', content : 'content'}
      })
    ).toEqual(
      {title : 'title', content : 'content'}
    )

    expect(
      reducer({title : 'default title', content : 'default content'}, {
        type: 'UPDATE_CARD',
        payload : {title : 'title'}
      })
    ).toEqual(
      {title : 'title', content : 'default content'}
    )
  })
});