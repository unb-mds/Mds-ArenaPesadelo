import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import AuthProvider from './contexts/AuthContext'
import GlobalStyles from './styles/global';

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
