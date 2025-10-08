// in frontend/src/views/CampaignHub.jsx
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../services/api';

// --- STYLED COMPONENTS ---

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1A103C;
  color: #E5E7EB;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const PortalContainer = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ProgressRing = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const PortalContent = styled.div`
  z-index: 2;
  h1 {
    font-size: 1.5rem;
    color: #A9A9B2;
    margin: 0;
    font-weight: normal;
  }
`;

const DayNumber = styled.p`
  font-size: 6rem;
  font-weight: bold;
  margin: 1rem 0;
  color: #FFF;
  text-shadow: 0 0 15px rgba(0, 246, 255, 0.5);
`;

const ContinueButton = styled.button`
  background-color: #00F6FF;
  color: #111;
  border: none;
  border-radius: 50px;
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 246, 255, 0.4);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 246, 255, 0.7);
  }
`;

// UPDATED: Changed the link to a styled button
const SecondaryButton = styled.button`
  margin-top: 2rem;
  background: transparent;
  color: #A9A9B2;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #FFF;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

function CampaignHub() {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    const radius = 180;
    const circumference = 2 * Math.PI * radius;
    const progressOffset = circumference - (progress / 40) * circumference;

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await api.get('/progress');
                const completedCount = res.data.filter(p => p.status === 'completed').length;
                setProgress(completedCount);
            } catch (error) {
                console.error("Failed to fetch progress", error);
            }
        };
        fetchProgress();
    }, []);

    return (
        <PageWrapper>
            
            <ContentWrapper>
                <PortalContainer>
                    <ProgressRing viewBox="0 0 400 400">
                        <circle
                            cx="200" cy="200" r={radius}
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="10" fill="transparent"
                        />
                        <circle
                            cx="200" cy="200" r={radius}
                            stroke="#00F6FF"
                            strokeWidth="10" fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={progressOffset}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                        />
                    </ProgressRing>
                    <PortalContent>
                        <h1>Continue Your Journey</h1>
                        <DayNumber>{String(progress + 1).padStart(2, '0')}</DayNumber>
                        <ContinueButton onClick={() => navigate(`/lesson/${progress + 1}`)}>
                            Start Day
                        </ContinueButton>
                    </PortalContent>
                </PortalContainer>
                {/* UPDATED: Using the new button component */}
                <SecondaryButton onClick={() => navigate('/dashboard')}>
                    View Full Dashboard
                </SecondaryButton>
            </ContentWrapper>
        </PageWrapper>
    );
}

export default CampaignHub;