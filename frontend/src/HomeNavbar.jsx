// in frontend/src/components/HomeNavbar.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

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
  gap: 2rem;
`;
const NavLink = styled.a`
  color: #a1a1a1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease-in-out;
  cursor: pointer;
  &:hover { color: #ffffff; }
`;
const LoginButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  &:hover { background-color: rgba(255, 255, 255, 0.2); }
`;

function HomeNavbar() {
  const navigate = useNavigate();
  return (
    <NavHeader>
      <NavContainer>
        <NavLink href="#hero">Odyn</NavLink>
        <NavLinks>
          <NavLink href="#campaign">Campaign</NavLink>
          <NavLink href="#footer">Contact</NavLink>
          <LoginButton onClick={() => navigate('/login')}>
            <LogIn size={20} />
            Login
          </LoginButton>
        </NavLinks>
      </NavContainer>
    </NavHeader>
  );
}
export default HomeNavbar;