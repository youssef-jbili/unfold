import type { FC, ReactNode } from 'react';
import { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useKeyboard } from '../../utils/keyboard';

let openModals = 0;

const ModalAnchor = styled.div<{ elevation: number }>`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ elevation }) => elevation};
`;

const ModalContainer = styled.div`
  position: absolute;
  background: #1f1f1f;
  overflow-x: hidden;
  border-radius: 4px;
  overflow: auto;
`;

export const Modal: FC<{
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}> = ({ isOpen, children, className, onClose }) => {
  const [elevation, setElevation] = useState<number | undefined>();

  useEffect(() => {
    if (isOpen) {
      openModals++;
      setElevation(openModals);
      return () => {
        openModals--;
        setElevation(undefined);
      };
    }
    return undefined;
  }, [isOpen]);

  const onEscapePress = useCallback(() => {
    if (isOpen && elevation === openModals) {
      onClose();
    }
  }, [elevation, isOpen, onClose]);

  useKeyboard(['Escape'], onEscapePress);

  if (!isOpen) {
    return null;
  }
  return (
    <ModalAnchor
      onClick={(e) => {
        if (e.button !== 0) {
          return;
        }
        e.stopPropagation();
        onClose();
      }}
      elevation={elevation ?? 0}
    >
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        className={className}
      >
        {children}
      </ModalContainer>
    </ModalAnchor>
  );
};
