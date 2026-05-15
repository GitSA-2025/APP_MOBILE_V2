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
    navigation.navigate("TwoFA");
  };

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

            <Text style={styles.h1}>Olá, seja bem vindo(a) novo usuário!</Text>
            <Text style={styles.h4}>
              Crie a sua nova conta no SA para continuar e utlizar as
              funcionalidades do APP!
            </Text>
            <View style={{ width: "100%", marginTop: 12 }}>
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
            </View>

            <TouchableOpacity style={styles.btnAvancar} onPress={handleRegister}>
              <Text style={styles.textBtn}>Avançar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 8 }} onPress={handleLogin}>
              <Text style={styles.textLink}>Já possuo login.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
