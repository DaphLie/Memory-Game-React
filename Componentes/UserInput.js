import React, { useState } from "react";
import { Text, StyleSheet, Button, Alert, TextInput } from "react-native";

export default (props) => {
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0); //Score começa sendo 0

  function finalizarJogo() {
    //reiniciar as variáveis para caso novo jogo seja iniciado
    props.funcVector([]);
    setInputValue("");
    props.funcSetWaitState(false);

    //Mostrar as opções de fases novamente
    props.funcDificuldade(true);
    setScore(0);
  }

  // função que irá verificar se o número digitado pelo jogar é igual ao número do vetor
  const checkAndAlert = () => {
    if (inputValue == props.vector.join("")) {
      //Caso o jogador acerte a sequência
      if (props.vector.length === 50) {
        //Se acertar 50 números o jogador ganha
        Alert.alert("Parabéns", "Você ganhou o jogo!", [
          { text: "Voltar ao Menu" },
        ]);
        finalizarJogo();
      } else {
        //gerar mais uma fase
        setScore(score + 1);
        props.funcSetWaitState(false);
        const newVector = [...props.vector, props.func()]; //gerar um número aleatório
        props.funcVector(newVector); //mudar o vetor atual
        setInputValue("");
        setTimeout(() => {
          //tempo mostrando a sequência
          props.funcSetWaitState(true);
        }, props.time);
      }
    } else {
      // jogador errou a sequência
      Alert.alert(
        "Score: " + score,
        "A sequência correta é " + props.vector.join(""),
        [{ text: "Voltar ao Menu" }]
      );
      finalizarJogo();
    }
  };

  return (
    <>
      {props.waitState ? ( //jogador irá preencher a sequência
        <>
          <TextInput
            style={{
              textAlign: "center",
              height: 40,
              backgroundColor: "white",
              borderRadius: 8,
              marginBottom: 10,
              flexGrow: 1, //caso o número inserido ultrapasse o comprimento original
              minWidth: 150,
              maxHeight: 40,
            }}
            onChangeText={(text) => {
              const isInteger = /^\d+$/.test(text); //expressão regular que verifica se o número dentro do input é válido (se só foram colocados números)
              if (isInteger) {
                setInputValue(text.trim()); //remove espaços em branco
              } else {
                Alert.alert("Erro", "Por favor digite apenas números");
              }
            }}
            placeholder="Digite Aqui"
            keyboardType="number-pad"
          />
          <Button
            title="Confirmar"
            color="#80b918"
            onPress={() => {
              checkAndAlert();
            }}
          />
        </>
      ) : (
        //mostrar a sequência
        <>
          <Text style={styles.text}>{props.vector}</Text>
        </>
      )}
      <Text style={styles.score}>Score: {score}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  score: {
    marginTop: 20,
    fontSize: 20,
  },
  text: {
    fontSize: 50,
    marginTop: 20,
    marginBottom: 20,
  },
});
