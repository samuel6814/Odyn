// in frontend/src/views/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { Home, LayoutGrid, User, MessagesSquare, LogOut } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import api from '../services/api';
import { useAuth } from './Context/AuthContext';

// --- STYLED COMPONENTS ---

const DashboardWrapper = styled.div`
  display: flex;
  background-color: #1A103C;
  min-height: 100vh;
  color: #E5E7EB;
`;

const MainContent = styled.main`
  flex-grow: 1;
  margin-left: 100px;
  padding: 2rem 3rem;
`;

const SidebarContainer = styled.div`
  width: 100px;
  height: 100vh;
  background-color: rgba(0,0,0,0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  position: fixed;
  left: 0;
  top: 0;
  justify-content: space-between;
  box-sizing: border-box;
`;

const NavIconGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavIcon = styled(NavLink)`
  color: #9CA3AF;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
  }
  &.active {
    color: #fff;
    background-color: #00F6FF;
    box-shadow: 0 0 15px rgba(0, 246, 255, 0.5);
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #9CA3AF;
  cursor: pointer;
  padding: 1rem;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #fff;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const WelcomeHeader = styled.div`
  p {
    color: #A9A9B2;
    margin: 0;
  }
  h1 {
    margin: 0.25rem 0 0 0;
    font-size: 2rem;
    color: #FFF;
  }
`;

const WidgetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const WidgetCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 16px;
`;

const CardTitle = styled.h2`
  margin: 0 0 1.5rem 0;
  font-size: 1.2rem;
  color: #FFF;
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.75rem;
`;

const DayButton = styled(Link)`
  background-color: rgba(0,0,0,0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #E5E7EB;
  border-radius: 8px;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.completed {
    background-color: #00F6FF;
    color: #111;
    font-weight: bold;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

// --- THE COMPONENT ---

function Dashboard() {
  const { user, logout } = useAuth();
  const [progressData, setProgressData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, activityRes] = await Promise.all([
          api.get('/progress'),
          api.get('/progress/activity'),
        ]);
        
        setProgressData(progressRes.data);

        const formattedActivity = activityRes.data.map(item => ({
          day: new Date(item._id).toLocaleDateString('en-US', { weekday: 'short' }),
          xp: item.totalXp,
        }));
        setActivityData(formattedActivity);

      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
        handleLogout();
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const completedDays = new Set(
    progressData
      .filter(p => p.status === 'completed' && p.lesson)
      .map(p => p.lesson.day)
  );

  if (!user) {
    return <div style={{ color: 'white', textAlign: 'center', paddingTop: '10rem' }}>Loading Dashboard...</div>;
  }

  return (
    <DashboardWrapper>
      <SidebarContainer>
        <NavIconGroup>
          <NavIcon to="/"><Home size={24} /></NavIcon>
          <NavIcon to="/campaign"><LayoutGrid size={24} /></NavIcon>
          <NavIcon to="/profile"><User size={24} /></NavIcon>
          <NavIcon to="/community"><MessagesSquare size={24} /></NavIcon>
        </NavIconGroup>
        <LogoutButton onClick={handleLogout}><LogOut size={24} /></LogoutButton>
      </SidebarContainer>

      <MainContent>
        <TopBar>
          <WelcomeHeader>
            <p>Welcome Back!</p>
            <h1>{user.name}</h1>
          </WelcomeHeader>
        </TopBar>
        
        <WidgetsGrid>
          <WidgetCard>
            <CardTitle>Total XP & Streak</CardTitle>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#FFF' }}>{user.xp} XP</div>
            <p style={{ color: '#A9A9B2' }}>Current Streak: {user.streak || 0} Days 🔥</p>
          </WidgetCard>

          <WidgetCard>
            <CardTitle>Weekly Activity</CardTitle>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#A9A9B2' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: '#A9A9B2' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#FFF'
                  }}
                  cursor={{fill: 'rgba(0, 246, 255, 0.1)'}}
                />
                <Bar dataKey="xp" fill="#00F6FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </WidgetCard>

          <WidgetCard style={{ gridColumn: '1 / 3' }}>
            <CardTitle>40 Days of Programming</CardTitle>
            <DayGrid>
              {Array.from({ length: 40 }, (_, i) => {
                const dayNumber = i + 1;
                const isCompleted = completedDays.has(dayNumber);
                return (
                  <DayButton 
                    key={dayNumber} 
                    to={`/lesson/${dayNumber}`}
                    className={isCompleted ? 'completed' : ''}
                  >
                    {String(dayNumber).padStart(2, '0')}
                  </DayButton>
                );
              })}
            </DayGrid>
          </WidgetCard>
        </WidgetsGrid>
      </MainContent>
    </DashboardWrapper>
  );
}

export default Dashboard;