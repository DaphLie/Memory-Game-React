import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Image } from "react-native";

import SelecionarDificuldade from "./Componentes/SelecionarDificuldade";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Renderizar a Imagem  */}
      <Image
        source={require("./assets/images/logo.png")}
        style={{ width: 280, height: 280, marginBottom: 30 }}
      />

      {/* Componente que renderiza o início do jogo */}
      <SelecionarDificuldade></SelecionarDificuldade>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9c46a",
    justifyContent: "center",
    alignItems: "center",
  },
});
