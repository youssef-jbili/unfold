import type { FC } from 'react';
import styled from 'styled-components';
import type { Issue, IssueDetailsConfig } from '../../../types/entities';
import { PrimaryButton, SecondaryButton } from '../../styles/base';
import { Icon } from '../shared/icon';

const IssueDetailsHeaderContainer = styled.div`
  background: #2c2c2c;
  padding: 10px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 8px;
  height: 28px;
`;

const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const IssueDetailsHeader: FC<{
  issue: Issue;
  onClose: () => void;
  isEditing: boolean;
  onEdit: () => void;
  config: IssueDetailsConfig;
  setConfig: (config: IssueDetailsConfig) => void;
}> = ({ issue, onClose, config, setConfig, onEdit, isEditing }) => (
  <IssueDetailsHeaderContainer>
    {!isEditing && (
      <>
        <StyledLabel>
          <input
            type="checkbox"
            name="highlight-strong"
            checked={config.highlightStrong}
            onChange={(e) => {
              setConfig({ ...config, highlightStrong: e.target.checked });
            }}
          />
          Surbrillance du texte en gras
        </StyledLabel>
        <SecondaryButton onClick={onEdit}>
          <Icon type="pencil" />
        </SecondaryButton>
        <PrimaryButton
          onClick={() => {
            window.open(
              `https://git.legalplace.eu/legalplace/api/-/issues/${issue.issueId}`,
              '_blank'
            );
          }}
        >
          Ouvrir dans gitlab
        </PrimaryButton>
      </>
    )}

    <SecondaryButton onClick={onClose}>
      <Icon type="close" />
    </SecondaryButton>
  </IssueDetailsHeaderContainer>
);
