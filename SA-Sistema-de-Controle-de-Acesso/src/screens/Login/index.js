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

export default function Login() {

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegister = () => {
        // Navega para a tela de cadastro
        navigation.navigate('Register');
    }

  const handleHome = () => {
    navigation.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <StatusBar style="light" />
          <View style={styles.popup}>
            <Image
              source={require("../../../assets/Logo_Kozzy.png")}
              style={styles.logo}
            />

            <Text style={styles.h1}>Olá, seja bem vindo(a) novamente!</Text>
            <Text style={styles.h4}>
              Conecte-se à sua conta para continuar e utilizar as
              funcionalidades do APP!
            </Text>
            <View style={{ width: "100%", marginTop: 12 }}>
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
            </View>
            <TouchableOpacity style={{ alignSelf: "flex-start" }}>
              <Text style={styles.textLink}>Esqueci a senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnAvancar} onPress={handleHome}>
              <Text style={styles.textBtn}>Avançar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 8 }} onPress={handleRegister}>
              <Text style={styles.textLink}>Não possuo login.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
