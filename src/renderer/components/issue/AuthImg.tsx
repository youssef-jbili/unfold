import type { FC } from 'react';
import { useEffect, useState } from 'react';

export const AuthImg: FC<{ src: string | undefined }> = ({ src }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    if (!src) {
      return;
    }
    setImageUrl(`https://git.legalplace.eu/legalplace/api${src}`);
  }, [src]);

  if (!imageUrl) {
    return null;
  }

  return <img alt="" src={imageUrl} />;
};
