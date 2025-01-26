import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { QueryClientProvider, QueryClient } from 'react-query';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import App from './App.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    }
  }
})

const theme = createTheme({
  headings: {
    fontWeight: '600',
    fontFamily: "Poppins, serif",
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
)
