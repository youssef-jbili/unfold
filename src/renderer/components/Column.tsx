import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { Issue } from '../../types/entities';
import { TertiaryButton } from '../styles/base';
import { Icon } from './shared/icon';
import { Card } from './issue/Card';
import { Pill } from './shared/Pill';
import { FlexInlineAlignCenter } from '../styles/mixins';

const ColumnContainer = styled.div<{ isCollapsed: boolean }>`
  background: #303030;
  flex-shrink: 0;
  width: ${({ isCollapsed }) => (isCollapsed ? '30px' : '350px')};
  border-radius: 4px;
  padding: 10px;
  box-shadow: 2px 4px 18px rgba(0, 0, 0, 0.1);
  margin: 10px;
  transition: width 0.2s ease;
`;

const ColumnHeader = styled.div<{ isCollapsed: boolean }>`
  justify-content: space-between;
  display: flex;
  transform-origin: 13px 17px;
  transform: rotate(${({ isCollapsed }) => (isCollapsed ? '90deg' : '0deg')});
  transition: transform 0.2s ease;
`;

const ColumnCards = styled.div`
  height: fit-content;
  max-height: calc(100vh - 130px);
  overflow-y: auto;
`;

const ColumnActions = styled.div`
  margin-left: 4px;
  gap: 4px;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #999;
`;

export const Column: FC<{
  label: string;
  issues: Issue[];
}> = ({ label, issues }) => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(
    window.localStorage.getItem(`collapse-${label}`) === 'true'
  );

  useEffect(() => {
    setTotalWeight(issues.reduce((acc, { weight }) => acc + (weight ?? 0), 0));
  }, [issues]);

  return (
    <ColumnContainer isCollapsed={isCollapsed}>
      <ColumnHeader isCollapsed={isCollapsed}>
        <FlexInlineAlignCenter gap="4px">
          <TertiaryButton
            onClick={() =>
              setIsCollapsed((x) => {
                window.localStorage.setItem(
                  `collapse-${label}`,
                  (!x).toString()
                );
                return !x;
              })
            }
          >
            <Icon type="chevron-down" />
          </TertiaryButton>
          <Pill label={label} borderStyle="thick" />
        </FlexInlineAlignCenter>
        <ColumnActions>
          <span>{issues.length}</span>
          <Icon type="issues" fillColor="#999" />
          <span>{totalWeight}</span>
          <Icon type="weight" fillColor="#999" />
        </ColumnActions>
      </ColumnHeader>
      {!isCollapsed && (
        <ColumnCards>
          {issues.map((issue) => (
            <Card key={issue.id} issue={issue} />
          ))}
        </ColumnCards>
      )}
    </ColumnContainer>
  );
};
