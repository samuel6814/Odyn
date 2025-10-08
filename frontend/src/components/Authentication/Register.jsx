// in frontend/src/views/Register.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
// UPDATED: Corrected import paths
import api from '../../services/api';
import Navbar from '../Navbar';

// This wrapper now acts as a flex column container
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1A103C;
`;

// This wrapper will center the form in the remaining space
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


function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please log in.');
      navigate('/login'); // Redirect to login page on success
    } catch (err) {
      const errorMessage = err.response?.data?.msg || 'An error occurred during registration.';
      alert(errorMessage);
      console.error(err.response?.data);
    }
  };

  return (
    <PageWrapper>
      <Navbar />
      <ContentWrapper>
        <FormContainer onSubmit={onSubmit}>
          <Title>Welcome!</Title>
          <Subtext>Your new way to learn programming.</Subtext>
          
          <Label htmlFor="name">Full Name</Label>
          <Input type="text" name="name" value={name} onChange={onChange} required />

          <Label htmlFor="email">Email address</Label>
          <Input type="email" name="email" value={email} onChange={onChange} required />

          <Label htmlFor="password">Create a password</Label>
          <Input type="password" name="password" value={password} onChange={onChange} required minLength="6" />

          <Button type="submit">Continue</Button>

          <SecondaryLink>
            Already a member? <Link to="/login">Login</Link>
          </SecondaryLink>
        </FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default Register;