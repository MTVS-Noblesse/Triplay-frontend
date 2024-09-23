import React, { useState } from 'react';
import styled from 'styled-components';

const TripCard = () => {
  return (
    <Container>
      <LeftContainer></LeftContainer>
      <RightContainer>
        <TextContainer>
          <Title></Title>
          <Content></Content>
        </TextContainer>
        <TextContainer>
          <Title></Title>
          <Content></Content>
        </TextContainer>
        <TextContainer>
          <Title></Title>
          <Content></Content>
        </TextContainer>
        <TripPath></TripPath>
      </RightContainer>
    </Container>
  );
};

export default TripCard;

const Container = styled.div`
  width: 80%;
  height: 7.44rem;
  display: flex;
  flex-direction: row;
  border-radius: 0.125rem;
  border: 0.5px solid #898989;
  box-sizing: border-box;
`;

const LeftContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.1rem;
  box-sizing: border-box;
`;

const RightContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: 0.5rem, 1.125rem;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 1.0625rem;
`;
const TripPath = styled.div`
  width: 100%;
  height: 1.69rem;
`;

const Title = styled.p`
  color: #000;
  font-size: 0.4375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Content = styled.p`
  color: #000;
  font-size: 0.3125rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
