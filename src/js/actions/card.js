export function updateCard(card) {
  return {
    type: 'UPDATE_CARD',
    payload: {
        title : card.title, 
        content : card.content
    }
  };
}

export function updateCardFromServer(card) {
  return function (dispatch) {
    var xhr = require("xhr");
    xhr({
        uri: "/json/data.json",
        json: true,
        headers: {
            "Content-Type": "application/json"
        }
    }, function (err, resp, body) {
        if(!err){
            dispatch(updateCard(body))
        }else{
            console.log(err);
        }
    })
  };
}