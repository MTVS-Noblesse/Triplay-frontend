import React,{useState, useEffect} from 'react';
import {ReactComponent as HamburgerIcon} from '../../assets/svgs/hamburger_icon.svg';
import {ReactComponent as PostIcon} from '../../assets/svgs/post_icon.svg';
import {ReactComponent as ClipIcon} from '../../assets/svgs/clip_icon.svg';
import {ReactComponent as TripIcon} from '../../assets/svgs/trip_icon.svg';
import {ReactComponent as ProfileIcon} from '../../assets/svgs/profile_icon.svg';

const FloatingButton = () => {
    const [showDivs, setShowDivs] = useState(false);

    const handleFloatingButtonClick = () => {
        setShowDivs(!showDivs);
    }
    const updatePosition = () => {
        const bodyRect = document.body.getBoundingClientRect();
        setOffset(bodyRect.left / 16 + 1.25);
    };

    return(
        <FloatingButtonContainer>
          <FloatingDivContainer showDivs={showDivs} offset={offset}>
            <StyledLink to="/mypage" showDivs={showDivs}>
              <FloatingDiv>
                <ProfileIcon />
                profile
              </FloatingDiv>
            </StyledLink>
            <StyledLink to="/clip" showDivs={showDivs}>
              <FloatingDiv>
                <ClipIcon />
                clip
              </FloatingDiv>
            </StyledLink>
            <StyledLink to="/post" showDivs={showDivs}>
              <FloatingDiv>
                <PostIcon />
                post
              </FloatingDiv>
            </StyledLink>
            <StyledLink to="/trip" showDivs={showDivs}>
              <FloatingDiv>
                <TripIcon />
                trip
              </FloatingDiv>
            </StyledLink>
          </FloatingDivContainer>
          <RootButton onClick={handleFloatingButtonClick} offset={offset}>
            <HamburgerIcon />
          </RootButton>
        </FloatingButtonContainer>
    )
}
export default FloatingButton;

const FloatingButtonContainer = styled.div`
  z-index: 1000;
`;

const FloatingDivContainer = styled.div`
  position: fixed;
  bottom: 1.875rem;
  right: ${(props) => `${props.offset}rem`};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: height 0.5s;
  height: ${(props) => (props.showDivs ? '20rem' : '0')};
  overflow: hidden;
  gap: 0.625rem;
`;

const RootButton = styled.button`
  position: fixed;
  bottom: 1.875rem;
  right: ${(props) => `${props.offset}rem`};
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  border-radius: 50%;
  background: var(--GrayScale-gray6, #444);
  color: white;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
`;

const FloatingDiv = styled.button`
  display: flex;
  flex-direction: column;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: #919191;
  padding: 0;
  border: none;
  margin: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  transition: bottom 0.5s ease-out;
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 0.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: 120%;
  letter-spacing: 0.00125rem;
`;

