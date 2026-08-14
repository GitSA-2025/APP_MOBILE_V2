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


export default function Login() {

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = () => {
        // Navega para a tela de cadastro
        navigation.navigate('Register');
    }

  const handleHome = () => {
    navigation.replace("App");
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container} >
          <StatusBar style="light" />
          <Animated.View style={styles.popup} /*entering={SlideInLeft.duration(800)}*/>
            <Animated.Image
              source={require("../../../assets/Logo_Kozzy.png")}
              style={styles.logo}
              entering={ZoomIn.delay(400).duration(800)}
            />

            <Animated.Text style={styles.h1} entering={ZoomIn.delay(500).duration(800)}>Olá, seja bem vindo(a) novamente!</Animated.Text>
            <Animated.Text style={styles.h4} entering={ZoomIn.delay(550).duration(800)}>
              Conecte-se à sua conta para continuar e utilizar as
              funcionalidades do APP!
            </Animated.Text>
            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(650).duration(800)}>
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
            </Animated.View>
            <TouchableOpacity style={{ alignSelf: "flex-start" }}>
              <Animated.Text style={styles.textLink}>Esqueci a senha</Animated.Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnAvancar} onPress={handleHome}>
              <Text style={styles.textBtn}>Avançar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 8 }} onPress={handleRegister}>
              <Text style={styles.textLink}>Não possuo login.</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
