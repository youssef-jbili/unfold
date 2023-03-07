import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const UserIconContainer = styled.div<{ isDisplayed: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: auto;
  ${({ isDisplayed }) => !isDisplayed && 'display: none'};
`;

export const MultiSelectCheck = styled.input`
  :not(&:checked) {
    display: none;
  }
`;

export const CardContainer = styled.div<{
  isFaded: boolean;
  isSelected?: boolean;
}>`
  background: #1f1f1f;
  border-radius: 4px;
  padding: 14px;
  margin-top: 10px;
  ${({ isFaded }) => isFaded && 'opacity:0.4'};
  ${({ isSelected }) => isSelected && 'box-shadow: inset 0 0 0 3px #63a6e9'};
  &:hover ${UserIconContainer} {
    display: none;
  }

  &:hover ${MultiSelectCheck} {
    display: block;
  }
`;

export const TitleContainer = styled(Link)`
  font-size: 14px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  text-align: left;
  background: unset;
  border: unset;
  cursor: pointer;
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
`;

export const LabelContainer = styled.div`
  margin-top: 18px;
  display: inline-flex;
  flex-wrap: wrap;
  gap: 4px;
  cursor: auto;
`;

export const FooterContainer = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 14px;
  font-weight: 400;
  height: 20px;
`;

export const FooterLeft = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 14px;
  font-weight: 400;
  gap: 8px;
  cursor: auto;
`;

export const IssueIdContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const UserIcon = styled.img<{ position: number }>`
  border-radius: 20px;
  position: relative;
  left: ${({ position }) => `${position * 8}px`};
  width: 24px;
  height: 24px;
`;
