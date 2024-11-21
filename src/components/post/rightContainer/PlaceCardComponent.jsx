import React, { useState } from 'react';
import styled from 'styled-components';
import ReportModal from './ReportModal';

const PlaceCardComponent = ({ place }) => {
    const [showReportModal, setShowReportModal] = useState(false);

    const openReportModal = () => setShowReportModal(true);
    const closeReportModal = () => setShowReportModal(false);

    // `files` 배열에서 이미지 데이터 가져오기
    const placeImages = place.files || []; // files가 없을 경우 빈 배열로 대체

    return (
        <PlaceCard>
            <PlaceHeader>
                <PlaceInfo>
                    <h4>{place.locationName}</h4>
                    <p>{place.address || '주소를 찾을 수 없습니다.'}</p>
                </PlaceInfo>
                <OptionsButton onClick={openReportModal}>•••</OptionsButton>
            </PlaceHeader>
            <Images>
                {placeImages.length > 0 ? (
                    placeImages.map((file) => (
                        <img src={file.fileUrl} alt={place.locationName} key={file.fileId} />
                    ))
                ) : (
                    <NoImageText>이미지가 없습니다.</NoImageText>
                )}
            </Images>
            {showReportModal && <ReportModal onClose={closeReportModal} />}
        </PlaceCard>
    );
};

export default PlaceCardComponent;

// Styled Components
const PlaceCard = styled.div`
    margin-bottom: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const PlaceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PlaceInfo = styled.div`
    h4 {
        margin: 0;
        font-size: 1.2rem;
    }

    p {
        margin: 0;
        font-size: 1rem;
        color: #666;
    }
`;

const OptionsButton = styled.button`
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Images = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;

    img {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 8px;
    }
`;

const NoImageText = styled.div`
    font-size: 1rem;
    color: #999;
`;

