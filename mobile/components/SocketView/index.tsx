import React, { useState } from "react"
import {StyleSheet, View, TouchableOpacity, TextInput, Text} from "react-native"

import { useSocketClient, useGyroscope } from "./hooks"

const SocketView:React.FC = () => {
  const [socketEndpoint, setSocketEndpoint] = useState("192.168.1.93")
  const { socketInstance, connectToServer, sendDirection, sendAction } = useSocketClient(socketEndpoint)
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
          style={[styles.buttons, {backgroundColor: !!socketInstance ? "green" : "red"}]}
          onPress={connectToServer}
      >
        <Text>{!!socketInstance ? "Disconnect" : "Connect"}</Text>
      </TouchableOpacity>

      <View style={styles.mouseClickButtonsContainer}>
        <TouchableOpacity
            style={styles.buttons}
            onPress={() => sendAction("left-click")}
        >
          <Text>Left Click</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => sendAction("middle-click")}
        >
          <Text>Middle Click</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttons}
          onPress={() => sendAction("right-click")}
        >
          <Text>Right Click</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
          style={styles.buttons}
          onPress={() => sendAction("center")}
      >
        <Text>Center Mouse</Text>
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
    gap: 16
  },

  mouseClickButtonsContainer: {
    flexDirection: "row",
    gap: 16
  },

  buttons: { 
    width: 100, 
    height: 100,

    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  
  addressInput: {
    height: 64,
    marginBottom: 16,
    color: "#fff"
  },
});

export default SocketView
