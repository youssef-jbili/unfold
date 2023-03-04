import type { FC, FormEventHandler } from 'react';
import { useState } from 'react';
import { PrimaryButton, StyledInput } from '../../styles/base';

export const OnboardingTokenInput: FC<{
  onSubmit: (token: string) => void;
  errorMessage?: string;
}> = ({ onSubmit, errorMessage }) => {
  const { REACT_APP_GITLAB_DOMAIN } = {
    REACT_APP_GITLAB_DOMAIN: 'https://git.legalplace.eu/',
  };
  const [token, setToken] = useState('');

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    onSubmit(token);
  };
  return (
    <>
      <h1>Token Gitlab</h1>
      <br />
      <p>
        Pour commencer à utiliser Gitlab automator, il faut renseigner{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${REACT_APP_GITLAB_DOMAIN}-/profile/personal_access_tokens`}
        >
          votre token gitlab.
        </a>
      </p>
      <br />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <p style={{ gap: '8px', display: 'flex', justifyContent: 'center' }}>
          <StyledInput
            type="password"
            style={{ width: '240px' }}
            onChange={(e) => setToken(e.target.value)}
          />
          <PrimaryButton type="submit" style={{ height: '44px' }}>
            Enregistrer
          </PrimaryButton>
        </p>
      </form>
      <br />
      <p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.lambdatest.com/support/docs/tas-how-to-guides-gl-token/"
        >
          Que doit je faire ?
        </a>
      </p>
    </>
  );
};
