import type { FC } from 'react';
import { useMemo } from 'react';
import styled from 'styled-components';
import { ChevronDownIcon } from '../../icons/ChevronDown';
import { CloseIcon } from '../../icons/Close';
import { IssuesIcon } from '../../icons/Issues';
import { IssueTypeIssueIcon } from '../../icons/IssueTypeIssue';
import { PencilIcon } from '../../icons/Pencil';
import { PlusIcon } from '../../icons/Plus';
import { WeightIcon } from '../../icons/Weight';

type IconType =
  | 'issue-type-issue'
  | 'plus'
  | 'weight'
  | 'issues'
  | 'close'
  | 'chevron-down'
  | 'pencil';

const StyledSvg = styled.div<{
  width: number;
  height: number;
  fillColor: string;
}>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  fill: ${({ fillColor }) => fillColor};
`;

export const Icon: FC<{
  type: IconType;
  width?: number;
  height?: number;
  fillColor?: string;
}> = ({ type, width = 16, height = 16, fillColor = 'white' }) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'chevron-down':
        return <ChevronDownIcon />;
      case 'close':
        return <CloseIcon />;
      case 'issue-type-issue':
        return <IssueTypeIssueIcon />;
      case 'issues':
        return <IssuesIcon />;
      case 'plus':
        return <PlusIcon />;
      case 'weight':
        return <WeightIcon />;
      case 'pencil':
        return <PencilIcon />;
      default:
        return null;
    }
  }, [type]);

  return (
    <StyledSvg width={width} height={height} fillColor={fillColor}>
      {icon}
    </StyledSvg>
  );
};
