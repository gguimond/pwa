export default function(card={title : 'default title', content : 'default content'}, action) {
  switch(action.type) {
    case 'UPDATE_CARD':
        return Object.assign({}, card, action.payload)
    default:
        return card;
  }
}