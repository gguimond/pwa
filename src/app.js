import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './js/reducers/card.js'
import { Card } from './js/containers/card.js'
import { renderToString } from 'react-dom/server'

const app = Express()
const port = 80

app.use(handleRender)

function handleRender(req, res) {
  const store = createStore(reducer)

  const html = renderToString(
        <Provider store={store}>
            <Card/>
        </Provider>
  )

  const preloadedState = store.getState()

  res.send(renderFullPage(html, preloadedState))
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
        <html lang="en">
        <head>
          <base href="/">
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
          <link rel="manifest" href="/manifest.json"/>
          <link href="http://localhost:8080/css/vendors.css" rel="stylesheet">
          <link href="http://localhost:8080/css/app.css" rel="stylesheet"></head>
        </head>
        <body>
        <div id="card-container">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script type="text/javascript" src="http://localhost:8080/js/vendors.js"></script>
        <script type="text/javascript" src="http://localhost:8080/js/app.js"></script>
      </body>
    </html>
    `
}

app.listen(port)