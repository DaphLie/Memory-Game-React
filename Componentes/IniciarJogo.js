import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import UserInput from "./UserInput";

export default (props) => {
  const [waitState, setWaitState] = useState(false);
  const [vector, setVector] = useState([]); // vetor com os números de resposta

  function funcVector(aux) {
    setVector(aux);
  }

  function funcSetWaitState(aux) {
    setWaitState(aux);
  }

  return (
    <>
      {props.startGamePressed ? ( //Se o jogador apertar para começar o jogo
        <TouchableOpacity
          style={styles.button_sequencia}
          //Primeira fase inicia
          onPress={() => {
            const newVector = [
              //gerar os primeiros 3 números aleatórios
              props.func(),
              props.func(),
              props.func(),
            ];
            setVector(newVector);
            props.funcStartGamePressed(false); // Apagar o botão de ver sequência
            props.funcDificuldade(false); //Os botões de dificuldade se "apagam"

            //Controlar o tempo em que a primeira sequência de número ira aparecer na tela
            setTimeout(() => {
              setWaitState(true);
            }, props.time);
          }}
        >
          <Text style={styles.text_sequencia}>
            Ver sequência - {props.dificuldade}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text></Text>
      )}
      <UserInput
        vector={vector}
        funcVector={funcVector}
        funcSetWaitState={funcSetWaitState}
        waitState={waitState}
        funcStartGamePressed={props.funcStartGamePressed}
        funcDificuldade={props.funcDificuldade}
        time={props.time}
        func={props.func}
      ></UserInput>
    </>
  );
};
const styles = StyleSheet.create({
  button_sequencia: {
    alignItems: "center",
    backgroundColor: "#a486d5",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  text_sequencia: {
    color: "#fff",
    fontSize: 16,
  },
});
