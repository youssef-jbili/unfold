import type { ChangeEventHandler, FC, MouseEventHandler } from 'react';
import { useCallback, useContext } from 'react';
import { Pill } from '../shared/Pill';
import { Icon } from '../shared/icon';
import type { Issue } from '../../../types/entities';
import { AppContext } from '../../pages/Home/context';
import {
  TitleContainer,
  LabelContainer,
  FooterContainer,
  FooterLeft,
  IssueIdContainer,
  UserIconContainer,
  UserIcon,
  CardContainer,
  MultiSelectCheck,
} from './Card.style';

const CardContent: FC<{
  issue: Issue;
  onMouseDown?: MouseEventHandler;
}> = ({ issue, onMouseDown }) => {
  const { showDepGraph, selectedIssueIds, selectIssue, deselectIssue } =
    useContext(AppContext);
  const handleMultiSelect: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.target.checked) {
        selectIssue(issue.id);
        return;
      }
      deselectIssue(issue.id);
    },
    [deselectIssue, issue.id, selectIssue]
  );
  return (
    <div>
      <div role="presentation" onMouseDown={onMouseDown}>
        <TitleContainer
          onDragStart={(e) => e.preventDefault()}
          to={`/issue/${issue.id}`}
        >
          {issue.title}
        </TitleContainer>
      </div>
      <br />
      <LabelContainer onMouseDown={onMouseDown}>
        {issue.labels
          .filter((label) => !label.name.startsWith('workflow'))
          .map((label) => (
            <Pill
              key={label.id}
              label={label.name}
              color={label.color}
              padding="0px 4px"
              textColor={label.textColor}
              onClick={() => showDepGraph(label.name)}
            />
          ))}
      </LabelContainer>
      <br />
      <FooterContainer>
        <FooterLeft onMouseDown={onMouseDown}>
          <IssueIdContainer>
            <Icon type="issue-type-issue" fillColor="#999" />#{issue.issueId}
          </IssueIdContainer>
          {issue.weight !== undefined && issue.weight !== null && (
            <>
              <Icon type="weight" fillColor="#999" />
              <span>{issue.weight}</span>
            </>
          )}
        </FooterLeft>
        <MultiSelectCheck
          type="checkbox"
          checked={selectedIssueIds.has(issue.id)}
          onChange={handleMultiSelect}
        />
        <UserIconContainer
          onMouseDown={onMouseDown}
          isDisplayed={!selectedIssueIds.has(issue.id)}
        >
          {issue.assignees &&
            issue.assignees.length > 0 &&
            issue.assignees.map((assignee, index) => (
              <UserIcon
                key={assignee}
                alt=""
                src={`https://git.legalplace.eu/uploads/-/system/user/avatar/${assignee}/avatar.png?width=24`}
                position={issue.assignees.length - 1 - index}
              />
            ))}
        </UserIconContainer>
      </FooterContainer>
    </div>
  );
};

export const Card: FC<{
  issue: Issue;
}> = ({ issue }) => {
  const { selectedIssueIds } = useContext(AppContext);
  return (
    <CardContainer
      isFaded={issue.display?.transparent ?? false}
      isSelected={selectedIssueIds.has(issue.id)}
    >
      <CardContent
        issue={issue}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      />
    </CardContainer>
  );
};
