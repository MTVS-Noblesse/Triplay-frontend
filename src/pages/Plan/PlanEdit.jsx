import React, { useState, useEffect } from 'react';
import Header from '../../layout/Header';
import LeftContainer from '../../components/editTripPage/EditPlanLeftContainer';
import RightContainer from '../../components/editTripPage/EditPlanRightContainer';
import { fetchTripDetails, updateTrip } from '../../api/tripDetail';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const PlanEdit = () => {
  const { tripId } = useParams(); // Get tripId from the URL
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const [tripTitle, setTripTitle] = useState('');
  const [tripParty, setTripParty] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const getTrip = async () => {
      try {
        const fetchedTrip = await fetchTripDetails(tripId);
        setTrip(fetchedTrip);
        setTripTitle(fetchedTrip.tripTitle);
        setTripParty(fetchedTrip.tripParty);
        setDateRange([fetchedTrip.tripStartDate, fetchedTrip.tripEndDate]);
        setPlaces(fetchedTrip.places || []);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      } finally {
        setLoading(false);
      }
    };
    getTrip();
  }, [tripId]);

  const handleSave = async () => {
    const updatedTrip = {
      tripId,
      tripTitle,
      tripParty,
      tripStartDate: dateRange[0],
      tripEndDate: dateRange[1],
      places,
    };

    try {
      await updateTrip(updatedTrip); // API call to update trip
      alert('여행 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('Error updating trip:', error);
      alert('여행 정보를 수정하는 중 문제가 발생했습니다.');
    }
  };

  if (loading) {
    return <div>여행 정보를 가져오는 중입니다...</div>;
  }

  if (!trip) {
    return <div>여행을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header />
      <TotalContainer>
        <LeftContainer
          tripTitle={tripTitle}
          setTripTitle={setTripTitle}
          tripParty={tripParty}
          setTripParty={setTripParty}
        />
        <RightContainer
          dateRange={dateRange}
          setDateRange={setDateRange}
          places={places}
          setPlaces={setPlaces}
          onSave={handleSave}
        />
      </TotalContainer>
    </div>
  );
};

export default PlanEdit;

// Styled Components
const TotalContainer = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  padding: 20px;
  box-sizing: border-box;
`;

const SectionContainer = styled.div`
  width: 45%;
  height: 100%;
  margin: 0 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow-y: auto;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const LeftSection = styled(SectionContainer)`
  background-color: #ffffff;
`;

const RightSection = styled(SectionContainer)`
  background-color: #ffffff;
`;
