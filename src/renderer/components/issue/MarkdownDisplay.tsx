/* eslint-disable react/prop-types */
import type { ComponentType, ComponentPropsWithoutRef, FC } from 'react';
import ReactMarkdown from 'react-markdown';
import type { ReactMarkdownProps } from 'react-markdown/lib/complex-types';
import styled from 'styled-components';
import { transformMarkdown } from '../../helpers/markdown';
import type { IssueDetailsConfig } from '../../../types/entities';
import { AuthImg } from './AuthImg';

const MarkdownContainer = styled.div<{ config: IssueDetailsConfig }>`
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 400;

  img {
    max-width: 80%;
  }
  h2 {
    font-size: 21px;
    font-weight: 600;
    border-bottom: 1px solid #444;
    padding: 4px;
    margin-bottom: 16px;
  }
  blockquote {
    margin: 8px;
    padding: 8px;
    box-shadow: inset 4px 0 0 0 #404040;
    padding-left: 24px;
    color: #fafafa;
    line-height: 21px;
  }
  pre {
    background-color: #1d1f21;
    border-radius: 4px;
    border: 1px solid rgb(64, 64, 64);
    padding: 12px;
    margin-bottom: 16px;
  }
  & > ul {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    padding: 0;
    margin: 0 0 16px;
  }
  li {
    position: relative;
    margin-inline-start: 2.25rem;
    line-height: 22.4px;
  }
  strong {
    ${({ config: { highlightStrong } }) =>
      highlightStrong &&
      `
        background: yellow;
        color: black;
      `}
  }
  a {
    color: #428fdc;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  li > code {
    background-color: #525252;
    padding: 2px 4px;
    border-radius: 4px;
  }
`;

const Img: ComponentType<
  ComponentPropsWithoutRef<'img'> & ReactMarkdownProps
> = ({ src }) => <AuthImg src={src} />;

export const MarkdownDisplay: FC<{
  content: string;
  config: IssueDetailsConfig;
}> = ({ config, content }) => (
  <MarkdownContainer config={config}>
    <ReactMarkdown linkTarget="_blank" components={{ img: Img }}>
      {transformMarkdown(content)}
    </ReactMarkdown>
  </MarkdownContainer>
);
