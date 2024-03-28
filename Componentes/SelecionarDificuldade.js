import React, { useState } from "react";
import { Text, StyleSheet, Button, View } from "react-native";
import IniciarJogo from "./IniciarJogo";

// Função que retorna um número aleatório entre 0 e 9
function createRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 10);
  return randomNumber;
}

export default () => {
  const [startGamePressed, setStartGamePressed] = useState(false); //começa como falso indicando que o jogo não começou
  const [time, setTime] = useState(2000); //o tempo padrão começa sendo de 2 segundos
  const [dificuldade, setDificuldade] = useState("Média"); //a fase padrão começa sendo média
  const [selecionarDificuldade, setSelecionarDificuldade] = useState(true); // boolean que controla se os botões de fases vão aparecer ou não

  // funções necessárias para realizar mudanças em variáveis que foram declaradas nesse componente
  function funcSelecionarDificuldade(aux) {
    setSelecionarDificuldade(aux);
  }

  function funcStartGamePressed(aux) {
    setStartGamePressed(aux);
  }

  return (
    <>
      {selecionarDificuldade ? ( // renderiza os botões de fase
        <>
          <View style={styles.button}>
            <View style={styles.button_medium}>
              <Button
                color="#81b29a"
                title="Fácil"
                onPress={() => {
                  setTime(4000); //tempo em que a sequência ira aparecer
                  setStartGamePressed(true);
                  setDificuldade("Fácil");
                }}
              />
            </View>
            <View style={styles.button_medium}>
              <Button
                color="#f2cc8f"
                title="Médio"
                onPress={() => {
                  setTime(2000);
                  setStartGamePressed(true);
                  setDificuldade("Médio");
                }}
              />
            </View>
            <View style={styles.button_medium}>
              <Button
                color="#e76f51"
                title="Difícil"
                onPress={() => {
                  setTime(500);
                  setStartGamePressed(true);
                  setDificuldade("Difícil");
                }}
              />
            </View>
          </View>
        </>
      ) : (
        <Text></Text> //Caso for falso não "mostrar nada"
      )}

      <IniciarJogo
        //todas as variáveis que vão ser acessadas e mudadas no próximo componente
        func={createRandomNumber}
        startGamePressed={startGamePressed}
        time={time}
        dificuldade={dificuldade}
        funcDificuldade={funcSelecionarDificuldade}
        funcStartGamePressed={funcStartGamePressed}
      ></IniciarJogo>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    maxHeight: 40,
  },
  button_medium: {
    marginRight: 5,
    marginLeft: 5,
  },
});
