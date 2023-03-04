import styled from 'styled-components';

export const InlineDiv = styled.div`
  display: inline-block;
`;

export const FlexAlignCenter = styled.div`
  display: flex;
  align-items: center;
`;

export const FlexJustifyCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const FlexCenterAll = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const FlexBase = styled.div`
  display: flex;
`;

export const FlexInlineBase = styled.div<{ gap?: string }>`
  display: inline-flex;
  gap: ${({ gap }) => !!gap && gap};
`;

export const FlexInlineAlignCenter = styled(FlexInlineBase)`
  display: inline-flex;
  align-items: center;
`;

export const FlexInlineJustifyCenter = styled(FlexInlineBase)`
  display: inline-flex;
  justify-content: center;
`;

export const FlexInlineCenterAll = styled(FlexInlineBase)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
