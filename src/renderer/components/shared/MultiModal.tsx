import type { FC, ReactNode } from 'react';

export const MultiModal: FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => <div>{children}</div>;
