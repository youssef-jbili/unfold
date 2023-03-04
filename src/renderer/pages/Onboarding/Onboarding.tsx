import type { FC } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingConfirmation } from '../../components/onboarding/OnboardingConfirmation';
import { OnboardingModal } from '../../components/onboarding/OnboardingModal';
import { OnboardingTokenInput } from '../../components/onboarding/OnboardingTokenInput';
import type { UserInfo } from '../../../types/entities';

enum OnboardingStep {
  TokenInput = 'TokenInput',
  Checking = 'Checking',
  Confirm = 'Confirm',
}

export const Onboarding: FC = () => {
  const [step, setStep] = useState<OnboardingStep>(OnboardingStep.TokenInput);
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const navigate = useNavigate();

  const handleTokenInput = async (e: string): Promise<void> => {
    setToken(e);
    setStep(OnboardingStep.Checking);
    await window.electron.ipcRenderer.checkToken({
      token,
    });
    const tokenUserInfo = {
      name: 'a',
      avatarUrl: 'a',
    };
    if (!tokenUserInfo) {
      setErrorMessage('Token invalide');
      setStep(OnboardingStep.TokenInput);
      return;
    }
    setUserInfo(tokenUserInfo);
    setStep(OnboardingStep.Confirm);
  };

  const saveToken = async (): Promise<void> => {
    // window.localStorage.setItem(KEY_GITLAB_API_TOKEN, token);
    navigate('/');
  };

  return (
    <OnboardingModal>
      {step === OnboardingStep.TokenInput && (
        <OnboardingTokenInput
          onSubmit={handleTokenInput}
          errorMessage={errorMessage}
        />
      )}
      {step === OnboardingStep.Checking && <>checking</>}
      {step === OnboardingStep.Confirm && userInfo && (
        <OnboardingConfirmation
          onSubmit={saveToken}
          onEdit={() => {
            setErrorMessage('');
            setStep(OnboardingStep.TokenInput);
          }}
          userInfo={userInfo}
        />
      )}
    </OnboardingModal>
  );
};

export default Onboarding;
