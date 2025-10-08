// in frontend/src/views/Hero.jsx
import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar'; // Re-import the Navbar

// Main Hero Section Styles
const HeroWrapper = styled.section`
  background-color: #1A103C;
  min-height: 100vh;
  padding-bottom: 4rem;
  /* Removed the padding-top */
`;

const HeroContent = styled.div`
  padding: 4rem 2rem;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const MainHeadline = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: -2px;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
`;

const Subtext = styled.p`
  font-size: 1.25rem;
  color: #A9A9B2;
  max-width: 600px;
  margin: 0 auto 6rem auto;
  line-height: 1.6;
`;

const SecondaryHeadline = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: #FFFFFF;
  text-align: left;
  margin-bottom: 2rem;
  text-transform: uppercase;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0.2)'};
  padding: 2rem;
  border-radius: 12px;
  text-align: left;
  color: #FFFFFF;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InfoCardBlue = styled(InfoCard)`
  color: #ffffff;
  background-color: #4285F4;
`;

const InfoCardNumber = styled.span`
  font-size: 1rem;
  font-weight: 600;
  opacity: 0.8;
  margin-bottom: 1.5rem;
`;

const InfoCardTitle = styled.h3`
  font-size: 1.75rem;
  margin: 0 0 1rem 0;
  color: ${props => (props.isYellow ? '#333' : 'inherit')};
`;

const InfoCardText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
`;


function Hero() {
  return (
    <HeroWrapper>
      <Navbar /> {/* Place Navbar here */}
      <HeroContent>
        <MainHeadline>Learn to Code</MainHeadline>
        <Subtext>
          Join a 40-day, story-driven campaign to master the fundamentals of web development through interactive challenges and real-world projects.
        </Subtext>
        
        <SecondaryHeadline>We Help You Build Better Habits - Together.</SecondaryHeadline>

        <CardsGrid>
          <InfoCardBlue>
            <InfoCardNumber>01</InfoCardNumber>
            <InfoCardTitle>Gamified Learning</InfoCardTitle>
            <InfoCardText>
              Stay motivated with daily quests, experience points, and badges as you progress through the 40-day curriculum.
            </InfoCardText>
          </InfoCardBlue>
          
          <InfoCard bgColor="#34A853">
            <InfoCardNumber>02</InfoCardNumber>
            <InfoCardTitle>Real-World Projects</InfoCardTitle>
            <InfoCardText>
              Apply what you learn by building tangible projects, from simple web pages to complex interactive applications.
            </InfoCardText>
          </InfoCard>

          <InfoCard bgColor="#FBBC05">
            <InfoCardNumber>03</InfoCardNumber>
            <InfoCardTitle isYellow>From Browser to VS Code</InfoCardTitle>
            <InfoCardText style={{ color: '#555' }}>
              Start coding instantly in the browser and seamlessly transition to a professional local development environment.
            </InfoCardText>
          </InfoCard>
        </CardsGrid>
      </HeroContent>
    </HeroWrapper>
  );
}

export default Hero;