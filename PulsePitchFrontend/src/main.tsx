import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer />
      </QueryClientProvider>
  </BrowserRouter>
);
