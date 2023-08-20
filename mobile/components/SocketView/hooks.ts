import { useCallback, useEffect, useState } from 'react';

import { Gyroscope, GyroscopeMeasurement } from 'expo-sensors';

import dgram from 'react-native-udp'

type sendDirectionType = (gyroscopeData: GyroscopeMeasurement) => void
type sendActionType = (action: "center" | "left-click" | "middle-click" | "right-click") => void

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
  const [socketInstance, setSocketInstance] = useState(undefined)

  const connectToServer = () => {
    if (!socketInstance)
    {
      const socket = dgram.createSocket('udp4')
      socket.bind(1609)
      setSocketInstance(socket)
    }
    else
    {
      socketInstance.close()
      setSocketInstance(undefined)
    }
  }

  const sendDirection: sendDirectionType = useCallback(gyroscopeData => {
    if (!!socketInstance) {
      // socketInstance.emit("direction", gyroscopeData)
      socketInstance.send('direction', undefined, undefined, 1609, socketEndpoint, err => console.warn)
    }
  }, [socketInstance])

  const sendAction: sendActionType = useCallback(action => {
    if (!!socketInstance) {
      // socketInstance.emit("action", action)
      socketInstance.send('action', undefined, undefined, 1609, socketEndpoint, err => console.warn)
    }
  }, [socketInstance])

  return { socketInstance, connectToServer, sendDirection, sendAction }
}
