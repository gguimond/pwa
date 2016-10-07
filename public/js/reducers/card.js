export default function(card={title : 'my title', content : 'my content'}, action) {
  switch(action.type) {
    case 'UPDATE_CARD':
        return Object.assign({}, card, action.payload)
    default:
        return card;
  }
}