import React, {useState} from "react"
import {StyleSheet, View, TouchableOpacity, TextInput} from "react-native"

import { io, Socket } from "socket.io-client";

const SocketView:React.FC = () => {
  const [socketEndpoint, setSocketEndpoint] = useState("ws://192.168.1.70:1609")
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

  const sendDirection = (direction: string) => {
    if (!!socketInstance) {
      socketInstance.emit("direction", direction)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.addressInputContainer}>

        <TextInput 
          style={styles.addressInput}
          placeholder="ws://0.0.0.0:1609"
          onChangeText={setSocketEndpoint}
          value={socketEndpoint}
        />

      </View>

      <TouchableOpacity
        style={[styles.mouseControls, {backgroundColor: !!socketInstance ? "green" : "red"}]}
        onPress={() => connectToServer()}
      />

      <View style={{alignItems: "center"}}>
      
        <View><TouchableOpacity style={styles.mouseControls} onPress={() => sendDirection("top")}/></View>
        
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity style={styles.mouseControls} onPress={() => sendDirection("left")}/>
          <TouchableOpacity style={styles.mouseControls} onPress={() => sendDirection("right")}/>
        </View>
        
        <View><TouchableOpacity style={styles.mouseControls} onPress={() => sendDirection("bottom")}/></View>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  mouseControls: { 
    width: 100, 
    height: 100, 

    margin: 5,

    backgroundColor: "blue",
  },

  addressInput: {
    width: "100%",
    height: 64,

    marginBottom: 16

  },

  addressInputContainer: {

  },
});

export default SocketView
