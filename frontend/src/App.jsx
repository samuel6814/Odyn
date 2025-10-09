// in frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomeLayout from './HomeLayout'; // Import the new layout
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Dashboard from './components/Dashboard';
import LessonPage from './components/LessonPage';
import PrivateRoute from './components/PrivateRoute';
import PrivateRoute2 from './components/PrivateRoute2';
import CampaignHub from './components/CampaignHub';

function App() {
  return (
    <Routes>
      {/* The root path now renders your scroll-snap page */}
      <Route path="/" element={<HomeLayout />} />

      {/* All other routes render their own pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/lesson/:day" element={<PrivateRoute><LessonPage /></PrivateRoute>} />
      <Route 
        path="/campaign" 
        element={<PrivateRoute2><CampaignHub /></PrivateRoute2>} 
      />
    
    </Routes>
  );
}

export default App;