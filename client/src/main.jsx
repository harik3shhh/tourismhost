import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import { AuthProvider } from './context/auth.jsx'
import { SearchProvider } from './context/Search.jsx'
import { store } from './redux/store.jsx'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <AuthProvider>
    <SearchProvider>
    <BrowserRouter>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition= {Zoom}
      />
    <App />
    </BrowserRouter>
    </SearchProvider>
    </AuthProvider>
    </Provider>
  
)
