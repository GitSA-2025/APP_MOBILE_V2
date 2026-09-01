import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AnimatedInput from "../../components/AnimatedInput";
import styles from "../../Styles/stylesLogin";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Animated from 'react-native-reanimated';
import { SlideInLeft, withTiming, Easing, ZoomIn } from "react-native-reanimated";

export default function Register() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  const handleLogin = () => {
    // Navega para a tela de login
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    // Navega para a tela de 2 fatores
    navigation.replace("TwoFA");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <StatusBar style="light" />
          <Animated.View style={styles.popup} entering={ZoomIn.duration(800)}>
            <Animated.Image
              source={require("../../../assets/Logo_Kozzy.png")}
              style={styles.logo}
              entering={ZoomIn.delay(300).duration(800)}
            />

            <Animated.Text style={styles.h1} entering={ZoomIn.delay(300).duration(800)}>Olá, seja bem vindo(a) novo usuário!</Animated.Text>
            <Animated.Text style={styles.h4} entering={ZoomIn.delay(350).duration(800)}>
              Crie a sua nova conta no SA para continuar e utlizar as
              funcionalidades do APP!
            </Animated.Text>
            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(450).duration(800)}>
              <AnimatedInput
                label="Nome"
                iconName="account"
                value={nome}
                onChangeText={setNome}
              />
              <AnimatedInput
                label="Email"
                iconName="email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <AnimatedInput
                label="Senha"
                iconName="lock"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
              <AnimatedInput
                label="Confirme a Senha"
                iconName="lock"
                value={confSenha}
                onChangeText={setConfSenha}
                secureTextEntry
              />
            </Animated.View>

            <Animated.View entering={ZoomIn.delay(550).duration(800)} style={{ width: "100%", marginTop: 12 }}>
              <TouchableOpacity style={styles.btnAvancar} onPress={handleRegister}>
                <Text style={styles.textBtn}>Avançar</Text>
              </TouchableOpacity>
            </Animated.View>


            <TouchableOpacity style={{ marginTop: 8 }} onPress={handleLogin}>
              <Animated.Text style={styles.textLink} entering={ZoomIn.delay(550).duration(800)}>Já possuo login.</Animated.Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
