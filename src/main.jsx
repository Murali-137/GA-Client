import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import GroceryContextProvider from './context/GroceryContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GroceryContextProvider>
      <App/>
    </GroceryContextProvider>  
  </BrowserRouter>
)
