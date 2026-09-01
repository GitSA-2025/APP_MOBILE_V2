import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AnimatedInput from "../../components/AnimatedInput";
import styles from "../../Styles/stylesLogin";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated from 'react-native-reanimated';
import { SlideInLeft, withTiming, Easing, ZoomIn } from "react-native-reanimated";
import LoadingOverlay from "../../components/LoadingOverlay";
import api from "../../api/api";



export default function Login() {

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(email, senha) {

    const dados = { email, senha };

    try {
      const res = await api.post('/api/mobile/app/login', dados);

      const { token } = res.data;

      await AsyncStorage.setItem('userToken', token);

      return token;
    } catch (err) {
      console.log('Erro ao fazer o login:', err.response?.data || err.message);
      throw err;
    }

  }

  const handleAvancar = async () => {

    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    if (loading) return; // Evita múltiplos cliques
    setLoading(true);

    try {
      await handleLogin(email, senha);
      Alert.alert('Seja bem vindo!', 'Login realizado com sucesso!');
      // Navega para a tela Home passando o email do usuário
      handleHome(email);
    } catch (err) {
      const msg = err.response?.data;
      if (msg?.error === "Credenciais inválidas") {
        Alert.alert('Erro', 'Email ou senha inválidos.');
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o login. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }

  };

  const handleRegister = (email) => {
    // Navega para a tela de cadastro
    navigation.navigate('Register');
  }

  const handleHome = () => {
    navigation.replace("App", { user_email: email});
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container} >
          <StatusBar style="light" />
          <Animated.View style={styles.popup} entering={ZoomIn.duration(800)}>
            <Animated.Image
              source={require("../../../assets/Logo_Kozzy.png")}
              style={styles.logo}
              entering={ZoomIn.delay(300).duration(800)}
            />

            <Animated.Text style={styles.h1} entering={ZoomIn.delay(300).duration(800)}>Olá, seja bem vindo(a) novamente!</Animated.Text>
            <Animated.Text style={styles.h4} entering={ZoomIn.delay(350).duration(800)}>
              Conecte-se à sua conta para continuar e utilizar as
              funcionalidades do APP!
            </Animated.Text>
            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(450).duration(800)}>
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
              <Animated.Text style={styles.textLink} entering={ZoomIn.delay(500).duration(800)}>Esqueci a senha</Animated.Text>
            </TouchableOpacity>

            <Animated.View entering={ZoomIn.delay(550).duration(800)} style={{ width: "100%", marginTop: 12 }}>
              <TouchableOpacity style={styles.btnAvancar} onPress={handleAvancar}>
                <Text style={styles.textBtn}>Avançar</Text>
              </TouchableOpacity>
            </Animated.View>



            <TouchableOpacity style={{ marginTop: 8 }} onPress={handleRegister}>
              <Animated.Text entering={ZoomIn.delay(550).duration(800)} style={styles.textLink}>Não possuo login.</Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <LoadingOverlay visible={loading} text="Carregando..." />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
