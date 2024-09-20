import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../layout/AdminHeader';
import Branding from '../../assets/svgs/branding.svg';

// 관리자 로그인 뷰
const AdminLogin = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 가상의 관리자 계정
  const adminAccount = {
    id: 'admin@gmail.com',
    password: 'admin_password123'
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!id && !password) {
      setErrorMessage('아이디를 입력해 주세요.');
    } else if (!id) {
      setErrorMessage('아이디를 입력해 주세요.');
    } else if (!password) {
      setErrorMessage('비밀번호를 입력해 주세요.');
    } else if (id !== adminAccount.id || password !== adminAccount.password) {
      setErrorMessage('아이디 또는 비밀번호가 잘못 되었습니다.');
    } else {
      navigate('/admin/home');
    }
  };
  
  return (
    <Container>
      <AdminHeader />
      <MainContent>
        <LeftSection>
          <LoginTitle>관리자 로그인</LoginTitle>
          <LoginForm onSubmit={handleLogin}>
            <InputGroup>
              <InputLabel>아이디</InputLabel>
              <Input 
                type="text"
                placeholder='아이디'
                onChange={(e) => setId(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLabel>비밀번호</InputLabel>
              <Input 
                type="password"
                placeholder='비밀번호'
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </InputGroup>
            <SubmitButton type='submit'>로그인</SubmitButton>
          </LoginForm>
        </LeftSection>
        <RightSection>
          <SloganWrapper>
            <Slogan src={Branding} alt="Branding Image" />
          </SloganWrapper>
        </RightSection>
      </MainContent>
    </Container>
  );
};

export default AdminLogin;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
`;

const MainContent = styled.main`
  display: flex;
  flex: 1;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginTitle = styled.h2`
  font-size: 2.3rem;
  font-family: 'KoreanHANAB', sans-serif;
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  width: 100%;
  max-width: 500px;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
  border-color: #b0eb75;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #b8e986;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  cursor: pointer;
  margin-top: 1rem;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const SloganWrapper = styled.div`
  width: 80%; // 슬로건의 최대 너비를 제한
  max-width: 456px; // 슬로건의 최대 크기 설정
  min-width: 200px; // 슬로건의 최소 크기 설정
`;

const Slogan = styled.img`
  width: 100%;
  height: auto;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-family: 'BM DoHyeon', sans-serif;
`;
