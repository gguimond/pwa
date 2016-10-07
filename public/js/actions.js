export function updateCard() {
  return {
    type: 'UPDATE_CARD',
    payload: {
        title : 'my Title updated', 
        content : 'my content updated'
    }
  };
}