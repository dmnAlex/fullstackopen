import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer
})
const store = createStore(
  reducer,
  composeWithDevTools()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)