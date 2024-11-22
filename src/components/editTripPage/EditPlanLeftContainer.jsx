import React from 'react';
import styled from 'styled-components';

const EditPlanLeftContainer = ({ tripTitle, setTripTitle, tripParty, setTripParty }) => {
  return (
    <LeftContainer>
      <InputSection>
        <Label>여행 제목</Label>
        <Input
          type="text"
          value={tripTitle}
          onChange={(e) => setTripTitle(e.target.value)}
          placeholder="여행 제목을 입력하세요"
        />
      </InputSection>
      <InputSection>
        <Label>누구랑</Label>
        <Input
          type="text"
          value={tripParty}
          onChange={(e) => setTripParty(e.target.value)}
          placeholder="여행 파트너를 입력하세요"
        />
      </InputSection>
    </LeftContainer>
  );
};

export default EditPlanLeftContainer;

// Styled Components
const LeftContainer = styled.div`
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
`;

const InputSection = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
`;
