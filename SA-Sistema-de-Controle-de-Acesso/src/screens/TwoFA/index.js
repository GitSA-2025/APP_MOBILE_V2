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
import styles from "./styles";
import AnimatedInput from "../../components/AnimatedInput"; // Input customizado com animação
import { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native"; // Para pegar params e navegação
import { StatusBar } from "expo-status-bar";

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
          <View style={styles.popup}>
            <Image
              source={require("../../../assets/Logo_Kozzy.png")}
              style={styles.logo}
            />

            <Text style={styles.h1}>Verificação de Duas Etapas</Text>
            <Text style={styles.h4}>
              Por favor, verifique a caixa de entrda do seu email ou o SPAM, e digite o código enviado no campo abaixo.
            </Text>
            <View style={{ width: "100%", marginTop: 12 }}>
              <AnimatedInput
              label="Código"
              iconName="numeric"
              value={codigo}
              onChangeText={setCodigo}
              maxLength={6} // Código de 6 dígitos
              keyboardType="number-pad"
            />
            </View>

            <TouchableOpacity style={styles.btnAvancar}>
              <Text style={styles.textBtn}>Avançar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
