import { useCallback, useEffect, useState } from 'react';

import { Gyroscope, GyroscopeMeasurement } from 'expo-sensors';

import { io, Socket } from "socket.io-client";

type sendDirectionType = (gyroscopeData: GyroscopeMeasurement) => void

// TODO: sendDirection is not updating the socketInstance value and is requesting even after connect been close

export const useGyroscope = (sendDirection: sendDirectionType) => {
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(sendDirection)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    Gyroscope.setUpdateInterval(16)
    return () => _unsubscribe();
  }, [sendDirection]);
}

export const useSocketClient = (socketEndpoint: string) => {
  const [socketInstance, setSocketInstance] = useState<Socket|undefined>(undefined)

  const connectToServer = () => {
    if (!socketInstance)
    {
      setSocketInstance(io(socketEndpoint))
    }
    else
    {
      socketInstance.close()
      setSocketInstance(undefined)
    }
  }

  const sendDirection: sendDirectionType = useCallback(gyroscopeData => {
    if (!!socketInstance) {
      socketInstance.emit("direction", gyroscopeData)
    }
  }, [socketInstance])

  return { socketInstance, connectToServer, sendDirection }
}
