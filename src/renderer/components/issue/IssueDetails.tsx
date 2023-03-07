import type { FC } from 'react';
import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import type { Issue, IssueDetailsConfig } from '../../../types/entities';
import { IssueDetailsHeader } from './IssueDetailsHeader';
import { MarkdownDisplay } from './MarkdownDisplay';
import { Modal } from '../shared/Modal';

const DetailsModal = styled(Modal)`
  width: 80vw;
  max-height: 80vh;
  max-width: 80vw;
`;

const IssueTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  padding: 14px;
`;

const IssueDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(80vh - 28px);
  overflow: hidden;
`;

export const IssueDetails: FC<{ issue?: Issue; onClose: () => void }> = ({
  issue,
  onClose,
}) => {
  const [config, setConfig] = useState<IssueDetailsConfig>({
    highlightStrong: false,
  });
  const [isEditing, setEditing] = useState<boolean>(false);

  const close = useCallback(() => {
    if (
      isEditing &&
      // eslint-disable-next-line no-restricted-globals, no-alert
      !confirm('You have unsaved changes, do you wish to close anyway ?')
    ) {
      return;
    }
    setEditing(false);
    onClose();
  }, [onClose, setEditing, isEditing]);

  useEffect(() => {
    const storedConfig = window.localStorage.getItem('detailsConfig');
    if (!storedConfig) {
      return;
    }
    const detailsConfig: IssueDetailsConfig = JSON.parse(storedConfig);
    setConfig(detailsConfig);
  }, []);

  return (
    <DetailsModal isOpen={issue !== undefined} onClose={close}>
      {issue && (
        <IssueDetailsContainer>
          <IssueDetailsHeader
            issue={issue}
            onClose={close}
            config={config}
            setConfig={(cfg) => {
              window.localStorage.setItem('detailsConfig', JSON.stringify(cfg));
              setConfig(cfg);
            }}
            isEditing={isEditing}
            onEdit={() => setEditing(true)}
          />
          <div style={{ overflowY: 'auto' }}>
            <IssueTitle>{issue.title}</IssueTitle>
            <MarkdownDisplay config={config} content={issue.description} />
          </div>
        </IssueDetailsContainer>
      )}
    </DetailsModal>
  );
};
