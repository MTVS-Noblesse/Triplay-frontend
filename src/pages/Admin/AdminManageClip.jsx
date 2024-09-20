import React, { useCallback, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAnglesLeft, faAngleRight, faAnglesRight, faArrowRight, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../../layout/AdminHeader';
import ReactPlayer from 'react-player';

const ConfirmModal = ({ isOpen, onClose, onConfirm, clip }) => {
  if (!isOpen || !clip) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ConfirmContent onClick={e => e.stopPropagation()}>
        <h2>클립 삭제</h2>
        <p>해당 클립이 삭제됩니다. 삭제하시겠습니까?</p>
        <ConfirmButtons>
          <ConfirmButton onClick={onClose}>취소</ConfirmButton>
          <ConfirmButton $primary onClick={() => onConfirm(clip)}>삭제</ConfirmButton>
        </ConfirmButtons>
      </ConfirmContent>
    </ModalOverlay>
  );
};

const UserItem = ({ user, onClick }) => (
  <UserItemContainer onClick={() => onClick(user)}>
    <UserId>{user.userId}</UserId>
    <UserPreference preference={user.preference}>{user.preference}</UserPreference>
    <ActionIcon>
      <FontAwesomeIcon icon={faArrowRight} />
    </ActionIcon>
  </UserItemContainer>
);

const UserList = ({ users, onUserClick }) => (
  <UserListContainer>
    {users.map((user) => (
      <UserItem key={user.userId} user={user} onClick={onUserClick} />
    ))}
  </UserListContainer>
);

const ClipThumbnail = ({ clip, onClick, isReported }) => (
  <ThumbnailContainer onClick={() => onClick(clip)} $isReported={isReported}>
    <img src={clip.thumbnailUrl} alt={clip.title} />
  </ThumbnailContainer>
);

const ClipList = ({ clips, reportedClips, onClipClick }) => (
  <ClipListContainer>
    <ClipListTitle>신고된 클립</ClipListTitle>
    <ThumbnailGrid>
      {clips.filter(clip => reportedClips.includes(clip.id)).map((clip) => (
        <ClipThumbnail 
          key={clip.id} 
          clip={clip} 
          onClick={onClipClick}
          isReported={true}
        />
      ))}
    </ThumbnailGrid>
  </ClipListContainer>
);

const ClipDetail = ({ clip, onClose, onDelete }) => {
  const [playing, setPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setShowControls(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShowControls(false);
  }, []);

  return (
    <ClipDetailContainer>
      <ClipPlayerWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <StyledReactPlayer
          playing={playing}
          url={clip.videoUrl}
          width="100%"
          height="100%"
          controls={false}
        />
        {showControls && (
          <PlayerOverlay onClick={togglePlay}>
            <PlayPauseIcon icon={playing ? faPause : faPlay} />
          </PlayerOverlay>
        )}
      </ClipPlayerWrapper>
    </ClipDetailContainer>
  );
};

// 관리자 클립 관리 뷰
const AdminManageClip = () => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedClip, setSelectedClip] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 5;

  const tempUsers = [
    { 
      userId: 'kamillee0918', 
      preference: '휴양',
      clips: [
        { id: 1, title: '제주도 여행', thumbnailUrl: 'https://cdn.pixabay.com/photo/2020/02/01/16/42/jusangjeolli-cliff-4810725_1280.jpg', videoUrl: 'https://cdn.pixabay.com/video/2024/08/20/227567_tiny.mp4' },
        { id: 2, title: '서핑 체험', thumbnailUrl: 'https://cdn.pixabay.com/photo/2020/08/16/19/29/surf-5493649_1280.jpg', videoUrl: 'https://cdn.pixabay.com/video/2024/08/30/228847_tiny.mp4' },
        { id: 3, title: '맛있는 저녁 식사', thumbnailUrl: 'https://cdn.pixabay.com/photo/2015/11/19/10/38/food-1050813_1280.jpg', videoUrl: 'https://cdn.pixabay.com/video/2024/03/31/206294_tiny.mp4' },
        { id: 4, title: '숙소 돌아보기', thumbnailUrl: 'https://cdn.pixabay.com/photo/2023/03/29/10/27/hotel-7885138_1280.jpg', videoUrl: 'https://cdn.pixabay.com/video/2021/04/13/70962-536644240_tiny.mp4' },
        { id: 5, title: '밤하늘의 별', thumbnailUrl: 'https://cdn.pixabay.com/photo/2017/02/09/09/11/starry-sky-2051448_1280.jpg', videoUrl: 'https://cdn.pixabay.com/video/2024/07/28/223551_tiny.mp4' },
        { id: 6, title: '아침 식사', thumbnailUrl: 'https://cdn.pixabay.com/photo/2017/08/02/00/51/food-2569257_1280.jpg', videoUrl: 'https://cdn.pixabay.com/video/2024/03/09/203511-921637015_tiny.mp4' },
        { id: 7, title: '집으로...', thumbnailUrl: 'https://cdn.pixabay.com/photo/2021/11/04/16/54/sky-6768714_1280.jpg', videoUrl: 'https://cdn.pixabay.com/video/2023/04/17/159310-818469335_tiny.mp4' },
      ],
      reportedClips: [1, 2, 3, 4, 5, 6, 7]  // 신고된 클립의 ID
    },
  ];

  useEffect(() => {
    setUsers(tempUsers);
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
    // 정렬 로직 구현
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setSelectedClip(null);
  };

  const handleClipClick = (clip) => {
    setSelectedClip(clip);
  };

  const handleDelete = () => {
    if (selectedClip) {
      setConfirmModalOpen(true);
    }
  };

  const confirmDelete = () => {
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.userId === selectedUser.userId) {
        return {
          ...user,
          clips: user.clips.filter(c => c.id !== selectedClip.id),
          reportedClips: user.reportedClips.filter(id => id !== selectedClip.id)
        };
      }
      return user;
    }));
    setConfirmModalOpen(false);
    setSelectedClip(null);
    // 선택된 사용자의 clips와 reportedClips 업데이트
    setSelectedUser(prevUser => ({
      ...prevUser,
      clips: prevUser.clips.filter(c => c.id !== selectedClip.id),
      reportedClips: prevUser.reportedClips.filter(id => id !== selectedClip.id)
    }));
  };

  const handleBack = () => {
    setSelectedUser(null);
    setSelectedClip(null);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const hasClips = users.some(user => user.clips && user.clips.length > 0);

  return (
    <Container>
      <AdminHeader />
      <ContentContainer>
        <TitleContainer>
          <Title>클립 관리 페이지</Title>
          <StyledLink to='/admin/manage'>
            관리자 페이지&nbsp;&nbsp;
            <FontAwesomeIcon icon={faArrowRight} size='lg' />
          </StyledLink>
        </TitleContainer>
        <SubTitle>신고 접수된 클립 확인 및 삭제를 할 수 있습니다.</SubTitle>
        <MainContent>
          {!hasClips ? (
            <NoClipMessage>아직 신고 접수된 클립이 없습니다.</NoClipMessage>
          ) : !selectedUser ? (
            <>
              <SortDropdown value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
                <option value="전체">전체</option>
                <option value="취향">취향</option>
              </SortDropdown>
              <UserList users={currentUsers} onUserClick={handleUserClick} />
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
            <>
              <BackButton onClick={handleBack}>
                <FontAwesomeIcon icon={faAngleLeft} /> 뒤로
              </BackButton>
              <ClipManagementContainer>
                <ClipList 
                  clips={selectedUser.clips} 
                  reportedClips={selectedUser.reportedClips}
                  onClipClick={handleClipClick} 
                />
                <ClipDetailSection>
                  {selectedClip ? (
                    <>
                      <ClipDetail
                        clip={selectedClip}
                        onClose={() => setSelectedClip(null)}
                      />
                      <ClipActionButtons>
                        <CancelButton onClick={() => setSelectedClip(null)}>취소</CancelButton>
                        <DeleteButton onClick={handleDelete}>클립 삭제</DeleteButton>
                      </ClipActionButtons>
                    </>
                  ) : (
                    <NoClipSelectedMessage>클립을 선택해주세요.</NoClipSelectedMessage>
                  )}
                </ClipDetailSection>
              </ClipManagementContainer>
            </>
          )}
        </MainContent>
      </ContentContainer>
      <ConfirmModal 
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={confirmDelete}
        clip={selectedClip}
      />
    </Container>
  );
};

export default AdminManageClip;

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

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const UserItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #D5D5D5;
  gap: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
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

const NoClipMessage = styled.div`
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
  background-color: ${props => props.$primary ? '#B0EB75' : '#f0f0f0'};
  color: ${props => props.$primary ? 'white' : 'black'};
`;

const ActionIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;

const CancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #D5D5D5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #B0EB75;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  height: 50px;
  font-size: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  &:disabled {
    background-color: #D5D5D5;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'KoreanHANAB', sans-serif;
  color: #000;
  margin-bottom: 1rem;
`;

const ClipManagementContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

const ClipListContainer = styled.div`
  width: 50%;
`;

const ClipListTitle = styled.h3`
  font-size: 1.5rem;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'BM DoHyeon', sans-serif;
  border-bottom: 1px solid #D5D5D5;
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1rem;
`;

const ThumbnailContainer = styled.div`
  cursor: pointer;
  position: relative;
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }
`;

const ClipDetailSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClipDetailContainer = styled.div`
  width: 100%;
  max-width: 240px;
  margin: 0 auto;
`;

const ClipPlayerWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 177.78%; // 9:16 비율 (16 / 9 * 100)
`;

const PlayerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const PlayPauseIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: white;
`;

// ReactPlayer 스타일 조정
const StyledReactPlayer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const ClipActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
`;

const NoClipSelectedMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 426.67px;
  background-color: #f0f0f0;
  font-size: 1.2rem;
  font-family: 'BM DoHyeon', sans-serif;
  color: #666;
`;