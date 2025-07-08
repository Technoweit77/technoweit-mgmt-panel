import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

import { AlertProvider } from './components/CustomAlert.jsx'



const queryClient = new QueryClient();

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
});


const AppWrapper = () => {
  const [themeMode, setthemeMode] = useState('light');
  const toggleTheme = () => {
    setthemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={themeMode === 'dark' ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AlertProvider>
            <App toggleTheme={toggleTheme} themeMode={themeMode} />
          </AlertProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
