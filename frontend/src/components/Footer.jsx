// in frontend/src/components/Footer.jsx
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin } from 'lucide-react';

const FooterContainer = styled.footer`
  background-color: #1A103C; /* UPDATED to match the theme */
  color: #A9A9B2;
  padding: 3rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const FooterColumn = styled.div`
  h3 {
    color: #FFF;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    margin-bottom: 0.75rem;
  }
  a {
    color: #A9A9B2;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: #00F6FF;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const CopyrightText = styled.p`
  text-align: center;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterGrid>
        <FooterColumn>
          <h3>Odyn</h3>
          <p>The next-gen platform for learning to code through interactive challenges.</p>
        </FooterColumn>
        <FooterColumn>
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/campaign">Campaign</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </FooterColumn>
        <FooterColumn>
          <h3>Resources</h3>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </FooterColumn>
        <FooterColumn>
          <h3>Follow Us</h3>
          <SocialLinks>
            <a href="#"><Twitter /></a>
            <a href="#"><Github /></a>
            <a href="#"><Linkedin /></a>
          </SocialLinks>
        </FooterColumn>
      </FooterGrid>
      <CopyrightText>&copy; {new Date().getFullYear()} Odyn Platform. All rights reserved.</CopyrightText>
    </FooterContainer>
  );
}

export default Footer;