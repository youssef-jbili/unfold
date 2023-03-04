import type { FC, ReactNode } from 'react';
import styled from 'styled-components';

const OnboardingModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const OnboardingModalContainer = styled.div`
  background-color: #303030;
  width: 70%;
  max-height: 70%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 18px;

  h1 {
    font-size: 28px;
    font-weight: 600;
    padding: 8px;
  }
  a {
    color: #428fdc;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const OnboardingModal: FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => (
  <OnboardingModalWrapper>
    <OnboardingModalContainer>{children}</OnboardingModalContainer>
  </OnboardingModalWrapper>
);
