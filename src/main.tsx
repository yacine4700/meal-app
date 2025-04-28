import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './contexts/favoritesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </FavoritesProvider>
  </StrictMode>,
)
