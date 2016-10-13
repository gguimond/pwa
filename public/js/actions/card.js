export function updateCard(card) {
  return {
    type: 'UPDATE_CARD',
    payload: {
        title : card.title, 
        content : card.content
    }
  };
}