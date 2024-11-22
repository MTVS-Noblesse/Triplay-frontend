import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import LeftContainer from '../../components/plan/PlanLeftContainer';
import RightContainer from '../../components/plan/PlanRightContainer';
import { fetchTripDetails, deleteTrip } from '../../api/tripDetail';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import useCurrentUser from '../../hooks/get-current-user'; // Custom hook to get current user info

const PlanDetail = () => {
  const { tripId } = useParams(); // Get tripId from the URL
  const navigate = useNavigate();
  const { userId: currentUserId } = useCurrentUser(); // Get the logged-in user's ID

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrip = async () => {
      try {
        const fetchedTrip = await fetchTripDetails(tripId); // Fetch trip details
        setTrip(fetchedTrip);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      } finally {
        setLoading(false);
      }
    };
    getTrip();
  }, [tripId]);

  const handleEdit = () => {
    navigate(`/plan/edit/${tripId}`); // Navigate to the edit page
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 이 여행을 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deleteTrip(tripId); // API call to delete the trip
        alert('여행이 삭제되었습니다.');
        navigate('/mypage'); // Redirect to the user's MyPage after deletion
      } catch (error) {
        console.error('Error deleting trip:', error);
        alert('여행 삭제 중 문제가 발생했습니다.');
      }
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
      <Container>
        <LeftContainer trip={trip} />
        <RightContainer trip={trip} />
      </Container>
      {trip.userId === currentUserId && ( // Show buttons only if the user is the author
        <ActionButtons>
          <EditButton onClick={handleEdit}>수정</EditButton>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
        </ActionButtons>
      )}
    </div>
  );
};

export default PlanDetail;

// Styled Components
const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  padding: 30px 60px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f;
  }
`;
