import { FC, useEffect, useState } from 'react';
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

  useEffect(() => {
    const asyncCheck = async () => {
      const { hasToken } = await window.electron.tokens.hasToken();
      if (hasToken) {
        navigate('/');
      }
    };
    asyncCheck();
  }, [navigate]);

  const handleTokenSubmit = async (newToken: string): Promise<void> => {
    setToken(newToken);
    setStep(OnboardingStep.Checking);
    const { userInfo: tokenUserInfo } = await window.electron.tokens.checkToken(
      {
        token: newToken,
      }
    );

    if (!tokenUserInfo) {
      setErrorMessage('Token invalide');
      setStep(OnboardingStep.TokenInput);
      return;
    }
    setUserInfo(tokenUserInfo);
    setStep(OnboardingStep.Confirm);
  };

  const saveToken = async (): Promise<void> => {
    await window.electron.tokens.saveToken({
      token,
    });
    navigate('/');
  };

  return (
    <OnboardingModal>
      {step === OnboardingStep.TokenInput && (
        <OnboardingTokenInput
          onSubmit={handleTokenSubmit}
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
