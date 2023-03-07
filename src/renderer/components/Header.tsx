import type { FC } from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from '../styles/base';

interface HeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

const HeaderContainer = styled.div`
  background: #303030;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export const Header: FC<HeaderProps> = ({ onRefresh, isRefreshing }) => (
  <HeaderContainer>
    <PrimaryButton type="button" onClick={onRefresh} disabled={isRefreshing}>
      {isRefreshing ? 'Refreshing...' : 'Refresh'}
    </PrimaryButton>
    <SecondaryButton onClick={() => {}}>open side window</SecondaryButton>
  </HeaderContainer>
);
