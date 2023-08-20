import React from "react"
import { StatusBar } from 'expo-status-bar';
import SocketView from "./components/SocketView"

export default function App() {
  return(
    <>
      <StatusBar style="light" />
      <SocketView/>
    </>
  );
}