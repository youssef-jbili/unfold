import { useCallback, useEffect, useState } from 'react';

const NETWORK_STATUS_CHECK_INTERVAL = 5 * 1000;

export const useNetworkStatus = (): [
  boolean /* isConnected */,
  () => void /* check network status */
] => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  const checkNetworkStatus = useCallback(async () => {
    const isOnline = await window.electron.network.getNetworkStatus();
    setIsConnected(isOnline);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      checkNetworkStatus,
      NETWORK_STATUS_CHECK_INTERVAL
    );
    return () => {
      clearInterval(interval);
    };
  }, [checkNetworkStatus]);

  return [isConnected, checkNetworkStatus];
};
