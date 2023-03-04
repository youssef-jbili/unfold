import type { FC } from 'react';
import styled from 'styled-components';

const PillContainer = styled.div<{
  color: string;
  padding: string;
  borderStyle: 'thin' | 'thick';
  textColor: string;
  isClickable: boolean;
}>`
  border-radius: 100px;
  overflow: hidden;
  border: ${({ borderStyle }) => (borderStyle === 'thin' ? '1px' : '2px')} solid
    ${({ color }) => color};
  display: inline-flex;
  width: max-content;
  font-size: 12px;
  color: ${({ textColor }) => textColor};
  & div {
    padding: ${({ padding }) => padding};
  }
  ${({ isClickable }) =>
    isClickable &&
    `
    &:hover{
      text-decoration: underline;
      cursor: pointer;
    }
  `}
`;

export const Pill: FC<{
  label: string;
  color?: string;
  textColor?: string;
  padding?: string;
  borderStyle?: 'thin' | 'thick';
  onClick?: () => void;
}> = ({
  label,
  color = '#428bca',
  padding = '4px',
  borderStyle = 'thin',
  textColor = 'white',
  onClick,
}) => (
  <PillContainer
    color={color}
    padding={padding}
    borderStyle={borderStyle}
    textColor={textColor}
    isClickable={!!onClick}
    onClick={onClick}
  >
    <div style={{ background: color }}>{label.split('::')[0]}</div>
    {label.split('::').length > 1 && <div>{label.split('::')[1]}</div>}
  </PillContainer>
);
