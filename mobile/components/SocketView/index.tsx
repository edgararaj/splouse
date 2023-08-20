import React, { useState } from "react"
import {StyleSheet, View, TouchableOpacity, TextInput, Text} from "react-native"

import { useSocketClient, useGyroscope } from "./hooks"

const SocketView:React.FC = () => {
  const [socketEndpoint, setSocketEndpoint] = useState("ws://192.168.1.93:1609")
  const { socketInstance, connectToServer, sendDirection } = useSocketClient(socketEndpoint)
  useGyroscope(sendDirection)
  
  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.addressInput}
        placeholder="ws://0.0.0.0:1609"
        onChangeText={setSocketEndpoint}
        value={socketEndpoint}
      />

      <TouchableOpacity
          style={[styles.mouseControls, {backgroundColor: !!socketInstance ? "green" : "red"}]}
          onPress={() => connectToServer()}
      >
        <Text>{!!socketInstance ? "Disconnect" : "Connect"}</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },

  mouseControls: { 
    width: 100, 
    height: 100, 

    alignItems: "center",
    justifyContent: "center",
  },

  addressInput: {
    height: 64,
    marginBottom: 16,
    color: "#fff"
  },
});

export default SocketView
