import styled, { css } from 'styled-components';

const baseButton = css`
  display: inline-flex;
  align-items: center;
  text-align: left;
  background: unset;
  border: unset;
  cursor: pointer;
  color: white;
`;

export const UnstyledButton = styled.button`
  ${baseButton};
`;

export const TertiaryButton = styled.button`
  ${baseButton};
  border-radius: 3px;
  transition: box-shadow 0.2s ease, transparent 0.2s ease;
  background: #303030;
  &:hover {
    background: #868686;
  }
  &:focus {
    background: #868686;
    box-shadow: 0 0 0 1px #333, 0 0 0 3px #1f75cb;
  }
`;

export const SecondaryButton = styled.button`
  ${baseButton};
  background: #1f1f1f;
  box-shadow: inset 0 0 0 1px #404040;
  padding: 6px 8px;
  border-radius: 3px;
  transition: box-shadow 0.2s ease;
  &:hover {
    box-shadow: inset 0 0 0 2px #868686;
  }
  &:focus {
    box-shadow: inset 0 0 0 1px #868686, 0 0 0 1px #333, 0 0 0 3px #1f75cb;
  }
`;

export const PrimaryButton = styled.button`
  ${baseButton};
  padding: 6px 8px;
  border-radius: 3px;
  transition: box-shadow 0.2s ease;

  :not(&:disabled) {
    box-shadow: inset 0 0 0 1px #63a6e9;
    background-color: #428fdc;
    &:hover {
      box-shadow: inset 0 0 0 2px #cbe2f9, 0 2px 2px 0 rgb(0 0 0 / 8%);
    }
    &:focus {
      box-shadow: inset 0 0 0 1px #cbe2f9, 0 0 0 1px #333, 0 0 0 3px #1f75cb;
    }
  }
  &:disabled {
    box-shadow: inset 0 0 0 1px #868686;
    background-color: #868686;
    cursor: not-allowed;
  }
`;

export const StyledInput = styled.input`
  display: inline-block;
  height: 34px;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  color: #fafafa;
  background-color: #333;
  background-clip: padding-box;
  border: 1px solid #868686;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;
