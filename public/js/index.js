require('../css/main.css');
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/card';
import { Card } from './containers/card';
import { Provider } from 'react-redux';
import { updateCard } from './actions/card'

navigator.serviceWorker.register('../sw.js');

const store = createStore(reducer, applyMiddleware(thunk));

window.addEventListener('beforeinstallprompt', function(e) {
    console.log('beforeinstallprompt Event fired');
    /*e.preventDefault();
    return false;*/

    // e.userChoice will return a Promise.
    // For more details read: http://www.html5rocks.com/en/tutorials/es6/promises/
    e.userChoice.then(function(choiceResult) {

        console.log(choiceResult.outcome);

        if(choiceResult.outcome == 'dismissed') {
         console.log('User cancelled home screen install');
        }
        else {
            console.log('User added to home screen');
        }
    });
});

window.addEventListener('DOMContentLoaded', function(){
    window.setTimeout(updateTab, 500);
    render(
        <Provider store={store}>
            <Card/>
        </Provider>,
        document.getElementById('card-container')
    );

    var xhr = require("xhr");
    xhr({
        uri: "/json/data.json",
        json: true,
        headers: {
            "Content-Type": "application/json"
        }
    }, function (err, resp, body) {
            if(!err){
                store.dispatch(updateCard(body))
            }
    })
});

let updateTab = function(){
    switch(location.hash){
        case '#one-panel':
            document.querySelectorAll(".mdl-tabs__tab-bar a")[0].click();
            break;
        case '#two-panel':
            document.querySelectorAll(".mdl-tabs__tab-bar a")[1].click();
            break;
        case '#three-panel':
            document.querySelectorAll(".mdl-tabs__tab-bar a")[2].click();
            break;
        default:
            break;
    }
}

window.onhashchange = updateTab;