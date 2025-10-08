import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import LessonPage from './components/LessonPage'
import PrivateRoute2 from './components/PrivateRoute2'
import CampaignHub from './components/CampaignHub'
import { AuthProvider } from './components/Context/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />

      <Route 
        path="/lesson/:day" 
        element={<PrivateRoute><LessonPage /></PrivateRoute>} 
      />
      <Route path="/campaign" element={<PrivateRoute2><CampaignHub /></PrivateRoute2>} />
    
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
