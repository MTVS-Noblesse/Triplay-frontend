import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../../layout/AdminHeader';

const ConfirmModal = ({ isOpen, onClose, onConfirm, action, userId }) => {
  if (!isOpen) return null;

  const actionText = action === 'suspend' ? '정지' : '정지 해제';
  const message = action === 'suspend' 
    ? `해당 회원을 정지합니다. 정지하시겠습니까?`
    : `해당 회원의 정지를 해제합니다. 해제하시겠습니까?`;

  return (
    <ModalOverlay onClick={onClose}>
      <ConfirmContent onClick={e => e.stopPropagation()}>
        <h2>회원 {actionText}</h2>
        <p>{message}</p>
        <ConfirmButtons>
          <ConfirmButton onClick={onClose}>취소</ConfirmButton>
          <ConfirmButton primary onClick={() => onConfirm(userId, action)}>{actionText}</ConfirmButton>
        </ConfirmButtons>
      </ConfirmContent>
    </ModalOverlay>
  );
};

const AdminManageUser = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('휴양');
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const usersPerPage = 5;

  const tempUsers = [
    { userId: 'lsy1307', preference: '액티비티', reportDate: '2024. 08. 01.' },
    { userId: 'lxxsxynnn', preference: '휴양', reportDate: null },
    { userId: 'pyoyal123', preference: '관광', reportDate: null },
    { userId: 'Hexeong', preference: '액티비티', reportDate: null },
    { userId: 'kamillee0918', preference: '관광', reportDate: null },
    { userId: 'test1', preference: '액티비티', reportDate: '2024. 09. 15.' },
    { userId: 'test2', preference: '휴양', reportDate: null },
  ];

  useEffect(() => {
    setUsers(tempUsers);
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
    const sortedUsers = [...users].sort((a, b) => {
      if (order === '날짜순') {
        if (!a.reportDate) return 1;
        if (!b.reportDate) return -1;
        return new Date(b.reportDate) - new Date(a.reportDate);
      } else {
        return a.userId.localeCompare(b.userId);
      }
    });
    setUsers(sortedUsers);
  };

  const handleAction = (userId, action) => {
    setSelectedUserId(userId);
    setSelectedAction(action);
    setConfirmModalOpen(true);
  };

  const handleConfirm = (userId, action) => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.userId === userId) {
        if (action === 'suspend') {
          return { ...user, reportDate: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '. ') };
        } else {
          return { ...user, reportDate: null };
        }
      }
      return user;
    }));
    setConfirmModalOpen(false);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>회원 관리 페이지</Title>
          <StyledLink to='/admin/manage'>
            관리자 페이지&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} size='lg' />
          </StyledLink>
        </TitleContainer>
        <SubTitle>회원 정지와 회원 정지 해제를 할 수 있습니다.</SubTitle>
        <MainContent>
          {users.length > 0 ? (
            <>
              <SortDropdown value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                <option value="날짜순">날짜순</option>
                <option value="닉네임순">닉네임순</option>
              </SortDropdown>
              <UserList>
                {currentUsers.map((user) => (
                  <UserItem key={user.userId}>
                    <UserId>{user.userId}</UserId>
                    <UserPreference preference={user.preference}>{user.preference}</UserPreference>
                    {user.reportDate && <ReportDate>{user.reportDate}</ReportDate>}
                    {!user.reportDate ? (
                      <ActionButton onClick={() => handleAction(user.userId, 'suspend')}>정지</ActionButton>
                    ) : (
                      <ActionButton onClick={() => handleAction(user.userId, 'unsuspend')}>정지 해제</ActionButton>
                    )}
                  </UserItem>
                ))}
              </UserList>
              <Pagination>
                <PaginationIcon icon={faAnglesLeft} onClick={() => setCurrentPage(1)} />
                <PaginationIcon icon={faAngleLeft} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
                {[...Array(totalPages)].map((_, index) => (
                  <PageNumber 
                    key={index} 
                    $isActive={currentPage === index + 1} 
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PageNumber>
                ))}
                <PaginationIcon icon={faAngleRight} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} />
                <PaginationIcon icon={faAnglesRight} onClick={() => setCurrentPage(totalPages)} />
              </Pagination>
            </>
          ) : (
            <NoUserMessage>아직 가입한 회원이 없습니다.</NoUserMessage>
          )}
        </MainContent>
      </ContentContainer>
      <ConfirmModal 
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        action={selectedAction}
        userId={selectedUserId}
      />
    </Container>
  );
};

export default AdminManageUser;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #ffffff;
`;

const ContentContainer = styled.main`
  padding: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const SubTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.3rem;
  font-family: 'KoreanHANAL', sans-serif;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledLink = styled(RouterLink)`
  color: #000000;
  text-decoration: none;
  font-size: 1.2rem;
  font-family: 'BM DoHyeon', sans-serif;
  padding-bottom: 10px;
  border-bottom: 2px solid #D5D5D5;
`;

const SortDropdown = styled.select`
  align-self: flex-end;
  padding: 0.5rem;
  font-family: 'BM DoHyeon', sans-serif;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 1.5rem;
  border-bottom: 1px solid #D5D5D5;
`;

const UserId = styled.span`
  flex: auto;
  font-size: 1.3rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const UserPreference = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: ${props => 
    props.preference === '액티비티' ? '#1A5319' : 
    props.preference === '휴양' ? '#80AF81' : '#508D4E'};
  color: white;
  font-size: 1rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const ReportDate = styled.span`
  color: #909090;
  font-size: 1rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  background-color: #000000;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-family: 'KoreanHANAB', sans-serif;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

const PaginationIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  cursor: pointer;
  margin: 0 0.5rem;
`;

const PageNumber = styled.button`
  background-color: ${props => props.$isActive ? '#B0EB75' : '#FFFFFF'};
  color: ${props => props.$isActive ? '#FFFFFF' : '#000000'};
  border: none;
  border-radius: 33px;
  width: 40px;
  height: 40px;
  font-size: 1rem;
  font-family: 'BM DoHyeon', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.$isActive ? '#B0EB75' : '#F5F5F5'};
  }
`;

const NoUserMessage = styled.div`
  padding: 1rem;
  text-align: center;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  font-size: 1.2rem;
  font-family: 'KoreanHANAL', sans-serif;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 30px;
  width: 100%;
  max-width: 400px;
  text-align: center;

  h2 {
    margin-bottom: 0.8rem;
    font-size: 1.5rem;
    font-family: 'KoreanJJPPB', sans-serif;
  }

  p {
    margin-bottom: 2rem;
    font-size: 1.2rem;
    font-family: 'KoreanJJPPM', sans-serif;
  }
`;

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const ConfirmButton = styled.button`
  width: 45%;
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 1.3rem;
  font-family: 'KoreanJJPPM', sans-serif;
  cursor: pointer;
  background-color: ${props => props.primary ? '#B0EB75' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : 'black'};
`;