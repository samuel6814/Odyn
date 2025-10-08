// in frontend/src/views/Login.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Navbar from '../Navbar'; // Corrected import path
import { useAuth } from "../Context/AuthContext"; // 1. Import useAuth

// --- STYLED COMPONENTS ---

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1A103C;
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: rgba(0,0,0,0.2);
  border-radius: 12px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #FFFFFF;
  margin-bottom: 0.5rem;
`;

const Subtext = styled.p`
  color: #A9A9B2;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: #A9A9B2;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background-color: #1A103C;
  border: 1px solid #4A3F6D;
  border-radius: 8px;
  color: #FFFFFF;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #00F6FF;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  background-color: #333;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #444;
  }
`;

const SecondaryLink = styled.p`
  text-align: center;
  color: #A9A9B2;
  margin-top: 1.5rem;

  a {
    color: #00F6FF;
    text-decoration: none;
    font-weight: bold;
  }
`;


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Get the login function from context

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      // 3. Use the context login function instead of localStorage directly
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'An error occurred during login.';
      alert(errorMessage);
      console.error(err.response?.data);
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <ContentWrapper>
        <FormContainer onSubmit={onSubmit}>
          <Title>Welcome Back!</Title>
          <Subtext>Please enter your details to sign in.</Subtext>
          
          <Label htmlFor="email">Email address</Label>
          <Input type="email" name="email" value={email} onChange={onChange} required />

          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" value={password} onChange={onChange} required />

          <Button type="submit">Sign In</Button>

          <SecondaryLink>
            Don't have an account? <Link to="/register">Register</Link>
          </SecondaryLink>
        </FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Login;