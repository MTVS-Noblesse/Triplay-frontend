import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { GlobalStyle } from '../styles/GlobalStyles';
import HeaderLogo from '../assets/svgs/header_logo.svg';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLoginClick = useCallback(() => {
    navigate('/admin/login');
  }, [navigate]);

  return (
    <>
      <GlobalStyle />
      <Header>
        <LogoWrapper>
          <Logo src={HeaderLogo} alt='Header Logo' />
        </LogoWrapper>
        <LoginButton onClick={handleLoginClick}>LOGIN</LoginButton>
      </Header>
    </>
  );
};

export default AdminHeader;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  background-color: #b8e986;

  @media (max-width: 768px) {
    padding: 0.8rem 2rem;
  }
`;

const LogoWrapper = styled.div`
  width: 30%; // 로고의 최대 너비를 제한
  max-width: 200px; // 로고의 최대 크기 설정
  min-width: 100px; // 로고의 최소 크기 설정
`;

const Logo = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const LoginButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  width: 90px;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1.3rem;
  font-family: 'LuckiestGuy-Regular', sans-serif;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 70px;
    height: 35px;
    font-size: 0.9rem;
  }
`;
