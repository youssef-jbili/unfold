import type { FC } from 'react';
import styled from 'styled-components';
import { useNetworkStatus } from '../hooks/networkStatus';
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

export const Header: FC<HeaderProps> = ({ onRefresh, isRefreshing }) => {
  const [isOnline] = useNetworkStatus();

  return (
    <HeaderContainer>
      <PrimaryButton
        type="button"
        onClick={onRefresh}
        disabled={isRefreshing || !isOnline}
      >
        {isRefreshing ? 'Refreshing...' : 'Refresh'}
      </PrimaryButton>
      {!isOnline && (
        <div>You&apos;re offline, some functionality might be disabled</div>
      )}
      <SecondaryButton
        onClick={async () => {
          await window.electron.windows.openSideWindow();
        }}
      >
        open side window
      </SecondaryButton>
    </HeaderContainer>
  );
};
