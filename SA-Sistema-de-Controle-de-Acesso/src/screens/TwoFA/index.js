import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Image
} from "react-native";
import styles from "../../Styles/stylesLogin";
import AnimatedInput from "../../components/AnimatedInput"; 
import { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import Animated from 'react-native-reanimated';
import { SlideInLeft, withTiming, Easing, ZoomIn } from "react-native-reanimated";

export default function TwoFA() {

  const navigation = useNavigation();
  const route = useRoute();

  const [codigo, setCodigo] = useState("");


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

            <Animated.Text style={styles.h1} entering={ZoomIn.delay(300).duration(800)}>Verificação de Duas Etapas</Animated.Text>
            <Animated.Text style={styles.h4} entering={ZoomIn.delay(350).duration(800)}>
              Por favor, verifique a caixa de entrda do seu email ou o SPAM, e digite o código enviado no campo abaixo.
            </Animated.Text>
            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(450).duration(800)}>
              <AnimatedInput
                label="Código"
                iconName="numeric"
                value={codigo}
                onChangeText={setCodigo}
                maxLength={6}
                keyboardType="number-pad"
              />
            </Animated.View>

            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(500).duration(800)}>
              <TouchableOpacity style={styles.btnAvancar}>
                <Text style={styles.textBtn}>Avançar</Text>
              </TouchableOpacity>
            </Animated.View>

          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
