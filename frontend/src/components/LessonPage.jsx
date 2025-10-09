// in frontend/src/views/LessonPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Navbar from '../components/Navbar';
import { Play, Target, Award, ArrowRight, Sparkles } from 'lucide-react';
import api from '../services/api';
import { useAuth } from './Context/AuthContext';
import { runPython } from '../services/pyodideService';

// --- STYLED COMPONENTS ---

const LessonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1A103C;
  color: #E5E7EB;
`;

const ContentGrid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const InstructionsPanel = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  h1 {
    margin-top: 0;
  }
`;

const InfoBox = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #FFF;
`;

const EditorColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EditorPanel = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  flex-grow: 1;
`;

const PanelHeader = styled.div`
  background-color: rgba(0,0,0,0.3);
  padding: 0.5rem 1rem;
  font-family: monospace;
  color: #A9A9B2;
`;

const ConsolePanel = styled.div`
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  height: 200px;
  display: flex;
  flex-direction: column;
`;

const ConsoleOutput = styled.pre`
  padding: 1rem;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  color: ${props => props.isCorrect ? '#22C55E' : (props.isError ? '#F87171' : '#E5E7EB')};
  flex-grow: 1;
  overflow-y: auto;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const RunButton = styled.button`
  padding: 0.75rem;
  border: none;
  background-color: #00F6FF;
  color: #111;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  border-radius: 8px;

  &:hover {
    background-color: #5ffbff;
  }
  
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const NextButton = styled.button`
  padding: 0.75rem;
  border: none;
  background-color: #22C55E;
  color: #FFF;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  border-radius: 8px;
  flex-grow: 1;
`;

const AIButton = styled.button`
  padding: 0.75rem;
  border: 1px solid #A9A9B2;
  background-color: transparent;
  color: #A9A9B2;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  border-radius: 8px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #FFF;
  }
`;

function LessonPage() {
  const { day } = useParams();
  const navigate = useNavigate();
  const { refetchUser } = useAuth();
  
  const [lesson, setLesson] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/${day}`);
        setLesson(res.data);
        setCode(res.data.starterCode || '');
      } catch (err) {
        console.error("Failed to fetch lesson", err);
        navigate('/dashboard');
      }
    };
    fetchLesson();
  }, [day, navigate]);
  
  const handleRunCode = async () => {
    if (!lesson || isRunning) return;
    
    setIsRunning(true);
    setOutput('Running code...');
    setIsCorrect(false);
    setIsError(false);

    try {
      const { output: consoleOutput, error } = await runPython(code);

      if (error) {
        setOutput(`Runtime Error:\n${error}`);
        setAttempts(prev => prev + 1);
        setIsError(true);
        return;
      }

      const expectedOutput = lesson.expectedOutput;
      if (consoleOutput.trim() === expectedOutput.trim()) {
        setOutput(`Success! Output is correct.\n\n${consoleOutput}`);
        setIsCorrect(true);
        try {
          await api.post('/progress', {
            lessonId: lesson._id,
            status: 'completed'
          });
          refetchUser();
        } catch (saveError) {
          console.error("Failed to save progress", saveError);
          setOutput(prev => prev + "\n\nWarning: Could not save progress.");
        }
      } else {
        setOutput(`Almost there! The output is not quite right. Keep trying.\n\nYour output:\n${consoleOutput}`);
        setAttempts(prev => prev + 1);
      }
    } catch (err) {
      setOutput(`An unexpected error occurred: ${err.message}`);
      setIsError(true);
    } finally {
      setIsRunning(false);
    }
  };

  if (!lesson) {
    return <div style={{ color: 'white', textAlign: 'center', paddingTop: '10rem' }}>Loading Lesson...</div>;
  }

  return (
    <LessonWrapper>
      <Navbar />
      <ContentGrid>
        <InstructionsPanel>
          <h1>Day {lesson.day}: {lesson.title}</h1>
          <p>{lesson.description}</p>
          <InfoBox>
            <IconWrapper><Target color="#00F6FF" size={24} /></IconWrapper>
            <div>
              <SectionTitle>Your Objective</SectionTitle>
              <p>{lesson.objective}</p>
            </div>
          </InfoBox>
          <InfoBox>
            <IconWrapper><Award color="#FBBC05" size={24} /></IconWrapper>
            <div>
              <SectionTitle>Rewards</SectionTitle>
              <p>+{lesson.rewards.xp} XP and the "{lesson.rewards.badge}" badge.</p>
            </div>
          </InfoBox>
        </InstructionsPanel>

        <EditorColumn>
          <EditorPanel>
            <PanelHeader>main.py</PanelHeader>
            <Editor
              height="100%"
              language="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value)}
            />
          </EditorPanel>
          <ConsolePanel>
            <PanelHeader>Console</PanelHeader>
            <ConsoleOutput isCorrect={isCorrect} isError={isError}>{output}</ConsoleOutput>
          </ConsolePanel>
          <ActionButtons>
            <RunButton onClick={handleRunCode} disabled={isRunning}>
              <Play size={18} />
              {isRunning ? 'Running...' : 'Run Code'}
            </RunButton>
            {isCorrect && (<NextButton>Next Lesson <ArrowRight size={18} /></NextButton>)}
            {!isCorrect && attempts >= 2 && (<AIButton><Sparkles size={18} /> Ask AI for a Hint</AIButton>)}
          </ActionButtons>
        </EditorColumn>
      </ContentGrid>
    </LessonWrapper>
  );
}

export default LessonPage;