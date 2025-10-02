import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '~styles/index.scss'
import App from './App.jsx'
import reportWebVitals from './reportWebVitals.js'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '~styles/GlobalStyles.js'
import { theme } from '~utils/constants.js'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles></GlobalStyles>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)

reportWebVitals()
