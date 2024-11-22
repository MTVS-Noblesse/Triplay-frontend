import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditPlanRightContainer = ({ dateRange, setDateRange, places, setPlaces, onSave }) => {
  const handleAddPlace = () => {
    const newPlace = {
      locationName: '',
      address: '',
      lat: 0,
      lng: 0,
      idx: places.length + 1,
    };
    setPlaces([...places, newPlace]);
  };

  const handleUpdatePlace = (index, key, value) => {
    const updatedPlaces = [...places];
    updatedPlaces[index][key] = value;
    setPlaces(updatedPlaces);
  };

  const handleRemovePlace = (index) => {
    const updatedPlaces = places.filter((_, i) => i !== index);
    setPlaces(updatedPlaces);
  };

  return (
    <RightContainer>
      <InputSection>
        <Label>여행 날짜</Label>
        <DatePickerWrapper>
          <DatePicker
            selected={new Date(dateRange[0])}
            onChange={(startDate) => setDateRange([startDate, dateRange[1]])}
            selectsStart
            startDate={new Date(dateRange[0])}
            endDate={new Date(dateRange[1])}
            dateFormat="yyyy-MM-dd"
          />
          <DatePicker
            selected={new Date(dateRange[1])}
            onChange={(endDate) => setDateRange([dateRange[0], endDate])}
            selectsEnd
            startDate={new Date(dateRange[0])}
            endDate={new Date(dateRange[1])}
            dateFormat="yyyy-MM-dd"
          />
        </DatePickerWrapper>
      </InputSection>
      <PlacesSection>
        <Label>장소</Label>
        {places.map((place, index) => (
          <PlaceCard key={index}>
            <PlaceInput
              type="text"
              value={place.locationName}
              onChange={(e) => handleUpdatePlace(index, 'locationName', e.target.value)}
              placeholder="장소 이름"
            />
            <PlaceInput
              type="text"
              value={place.address}
              onChange={(e) => handleUpdatePlace(index, 'address', e.target.value)}
              placeholder="주소"
            />
            <RemoveButton onClick={() => handleRemovePlace(index)}>삭제</RemoveButton>
          </PlaceCard>
        ))}
        <AddPlaceButton onClick={handleAddPlace}>장소 추가</AddPlaceButton>
      </PlacesSection>
      <SaveButton onClick={onSave}>저장</SaveButton>
    </RightContainer>
  );
};

export default EditPlanRightContainer;

// Styled Components
const RightContainer = styled.div`
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

const DatePickerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const PlacesSection = styled.div`
  margin-bottom: 20px;
`;

const PlaceCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PlaceInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-right: 10px;
`;

const RemoveButton = styled.button`
  padding: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const AddPlaceButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
