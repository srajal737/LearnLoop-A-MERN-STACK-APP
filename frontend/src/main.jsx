import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit';
import {Provider} from 'react-redux'
import rootreducer from './reducers/index.js'
import {Toaster} from 'react-hot-toast'
const store = configureStore({
  reducer:rootreducer
})
//strict mode helps to find problem during development.
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <BrowserRouter>
   <App />
   <Toaster/>
 </BrowserRouter>
 
  </Provider>


)
