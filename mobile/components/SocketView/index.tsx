import React, {useEffect, useState} from "react"
import {StyleSheet, View, TouchableOpacity, TextInput, Text} from "react-native"

import { useSocketClient, getGyroscope } from "./hooks"

const SocketView:React.FC = () => {
  const [socketEndpoint, setSocketEndpoint] = useState("ws://192.168.1.70:1609")
  const { socketInstance, connectToServer, sendDirection } = useSocketClient(socketEndpoint)
  const { x, y, z } = getGyroscope()

  useEffect(() => {
    if (x < -0.1) sendDirection("bottom")
    else if (x > 0.1) sendDirection("top")
    if (z < -0.1) sendDirection("right")
    else if (z > 0.1) sendDirection("left")
  }, [x,y,z])
  
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

      {/* <View>
        <Text>{JSON.stringify({ x, y, z })}</Text>
      </View> */}

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
