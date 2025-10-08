// in frontend/src/components/Navbar.jsx
import React from 'react';
import styled from 'styled-components';
import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, User, MessagesSquare, LogIn, LogOut } from 'lucide-react';

const NavHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding: 1rem 0;
`;

const NavContainer = styled.nav`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledNavLink = styled(RouterNavLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: #a1a1a1;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const AuthButton = styled.button`
  /* Shared styles for both Login and Logout */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  font-weight: 500;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    // We navigate to the home page and then reload to ensure all state is cleared
    navigate('/');
    window.location.reload();
  };

  return (
    <NavHeader>
      <NavContainer>
        <StyledNavLink to="/">
          <Home size={20} />
          Odyn
        </StyledNavLink>

        <NavLinks>
          <StyledNavLink to="/campaign">
            <LayoutGrid size={20} />
            Campaign
          </StyledNavLink>
          <StyledNavLink to="/profile">
            <User size={20} />
            Profile
          </StyledNavLink>
          <StyledNavLink to="/community">
            <MessagesSquare size={20} />
            Community
          </StyledNavLink>

          {/* --- UPDATED DYNAMIC BUTTON --- */}
          {token ? (
            <AuthButton onClick={handleLogout}>
              <LogOut size={20} />
              Logout
            </AuthButton>
          ) : (
            <AuthButton onClick={() => navigate('/login')}>
              <LogIn size={20} />
              Login
            </AuthButton>
          )}
          {/* ----------------------------- */}
        </NavLinks>
      </NavContainer>
    </NavHeader>
  );
}

export default Navbar;