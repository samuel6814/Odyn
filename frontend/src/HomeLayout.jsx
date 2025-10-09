// in frontend/src/views/HomeLayout.jsx
import React from 'react';
import styled from 'styled-components';
import HomeNavbar from './HomeNavbar';
import Hero from './components/Hero';
import CampaignHub from './components/CampaignHub';
import Footer from './components/Footer';

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.div`
  scroll-snap-align: start;
`;

function HomeLayout() {
  return (
    <Container>
      {/* <HomeNavbar /> */}
      <Section id="hero">
        <Hero />
      </Section>
      <Section id="campaign">
        <CampaignHub />
      </Section>
      <Section id="footer">
        <Footer />
      </Section>
    </Container>
  );
}

export default HomeLayout;