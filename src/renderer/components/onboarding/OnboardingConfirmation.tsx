import type { FC, FormEventHandler } from 'react';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from '../../styles/base';
import type { UserInfo } from '../../../types/entities';

const AvatarImage = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 100px;
`;

export const OnboardingConfirmation: FC<{
  onSubmit: () => void;
  onEdit: () => void;
  userInfo: UserInfo;
}> = ({ onSubmit, onEdit, userInfo: { name, avatarUrl } }) => {
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <>
      <h1>Confirmation</h1>
      <br />
      <p>
        <AvatarImage src={avatarUrl} />
      </p>
      <p>{name}</p>
      <br />
      <form onSubmit={handleSubmit}>
        <p
          style={{
            gap: '8px',
            display: 'inline-flex',
            justifyContent: 'space-between',
            width: '400px',
          }}
        >
          <SecondaryButton
            type="button"
            style={{ height: '44px' }}
            onClick={onEdit}
          >
            Non ce n&apos;est pas moi
          </SecondaryButton>
          <PrimaryButton type="submit" style={{ height: '44px' }}>
            C&apos;est moi
          </PrimaryButton>
        </p>
      </form>
    </>
  );
};
