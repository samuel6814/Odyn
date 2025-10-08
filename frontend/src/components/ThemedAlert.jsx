// in frontend/src/components/ThemedAlert.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(26, 16, 60, 0.9);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalContent = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem 3rem;
  text-align: center;
  color: #FFF;
  max-width: 400px;
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  border: none;
  background-color: #00F6FF;
  color: #111;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 1.5rem;
`;

function ThemedAlert() {
  const navigate = useNavigate();
  return (
    <ModalOverlay>
      <ModalContent>
        <ShieldAlert size={48} color="#00F6FF" style={{ marginBottom: '1rem' }} />
        <h2>Access Denied</h2>
        <p>You must be logged in to view this page.</p>
        <Button onClick={() => navigate('/login')}>Go to Login</Button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ThemedAlert;