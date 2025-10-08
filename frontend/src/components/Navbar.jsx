// in frontend/src/components/Navbar.jsx
import React from 'react';
import styled from 'styled-components';
// UPDATED: Import Link and NavLink from react-router-dom
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Home, LayoutGrid, User, MessagesSquare, LogIn } from 'lucide-react';

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

// UPDATED: Use NavLink from react-router-dom for styling
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

  /* UPDATED: Style for the active link using the .active class */
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }

  &:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

// UPDATED: Use Link from react-router-dom for the button
const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

function Navbar() {
  // UPDATED: useState is no longer needed for active state
  return (
    <NavHeader>
      <NavContainer>
        {/* UPDATED: Use "to" prop for navigation */}
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
          <LoginButton to="/login">
            <LogIn size={20} />
            Login
          </LoginButton>
        </NavLinks>
      </NavContainer>
    </NavHeader>
  );
}

export default Navbar;