import { useEffect, useState } from 'react';

import {
  Gyroscope, GyroscopeMeasurement,
} from 'expo-sensors';

import { io, Socket } from "socket.io-client";

interface GyroscopeType {
  x: number
  y: number
  z: number
} 

type direction = "top" | "left" | "right" | "bottom" 

export const useSocketClient = (socketEndpoint: string) => {
  const [socketInstance, setSocketInstance] = useState<Socket|undefined>()

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

  const sendDirection = (direction: direction) => {
    if (!!socketInstance) {
      socketInstance.emit("direction", direction)
    }
  }

  return { socketInstance, connectToServer, sendDirection }
}

export const getGyroscope = (): GyroscopeType =>  {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(setData)
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    _fast()
    return () => _unsubscribe();
  }, []);

  return {x,y,z}
}
