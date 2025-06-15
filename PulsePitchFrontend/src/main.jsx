import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from "./Context/LoggedInUserContext"
import { LoggedInUserTeams } from "./Context/LoggedInUserTeamContext"
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LoggedInUserTeams>
          <App />
      </LoggedInUserTeams>
    </AuthProvider>
        </QueryClientProvider>
  </BrowserRouter>
);
