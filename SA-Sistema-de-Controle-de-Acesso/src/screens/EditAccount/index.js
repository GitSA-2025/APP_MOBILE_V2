import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";

import AnimatedInput from "../../components/AnimatedInput";
import PhotoPickerAccount from "../../components/PhotoPickerAccount";

import styles from "../../Styles/stylesForm";
import stylesModal from "../../Styles/stylesModal";

import { useNavigation } from "@react-navigation/native";
import Animated, { ZoomIn, withTiming, Easing } from 'react-native-reanimated';

export default function EditAccount() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailAlt, setEmailAlt] = useState("");
  const [foto, setFoto] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  return (
    <View style={{ flex: 1 }}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.container}>
            <StatusBar style="inverted" />

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scroll}
            >
              <Animated.View style={styles.popup} entering={ZoomIn.duration(800)}>

                <Animated.View style={styles.header} entering={ZoomIn.delay(200).duration(800)}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.replace("App", {
                        screen: "Home",
                      });
                    }}
                  >
                    <Ionicons
                      name="arrow-back-outline"
                      size={24}
                      color="black"
                    />
                  </TouchableOpacity>

                  <Text style={styles.h1}>Editar Conta</Text>
                </Animated.View>

                <Animated.View style={{ margin: 24 }} entering={ZoomIn.delay(250).duration(800)}>
                  <PhotoPickerAccount onChange={setFoto} />
                </Animated.View>

                <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(250).duration(800)}>
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
                </Animated.View>

                <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(300).duration(800)}>
                  <TouchableOpacity style={styles.btnSalvar}>
                    <Text style={styles.textBtn}> Salvar </Text>
                  </TouchableOpacity>
                </Animated.View>

                <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(350).duration(800)}>
                  <TouchableOpacity
                    style={stylesModal.openButton}
                    onPress={() => setModalOpen(true)}
                  >
                    <Text style={stylesModal.openButtonText}>
                      Alterar senha
                    </Text>
                  </TouchableOpacity>
                </Animated.View>

              </Animated.View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {modalOpen && (
        <Animated.View style={stylesModal.overlay} entering={ZoomIn.duration(800)}>

          {/* Área escura que fecha o modal */}
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              setModalOpen(false);
            }}
          >
            <View style={StyleSheet.absoluteFillObject} />
          </TouchableWithoutFeedback>

          <KeyboardAvoidingView
            pointerEvents="box-none"
            style={stylesModal.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <Animated.View style={stylesModal.modalBox} entering={ZoomIn.duration(800)}>

                <Animated.View style={stylesModal.modalHeader} entering={ZoomIn.delay(200).duration(800)}>
                  <Text style={stylesModal.modalTitle}>
                    Alterar senha
                  </Text>

                  <TouchableOpacity
                    style={stylesModal.closeButton}
                    onPress={() => setModalOpen(false)}
                  >
                    <Ionicons
                      name="close"
                      size={30}
                      color="#333"
                    />
                  </TouchableOpacity>
                </Animated.View>

                <Animated.Text style={stylesModal.description} entering={ZoomIn.delay(250).duration(800)}>
                  Insira o e-mail da conta para efetuar a alteração da senha.
                </Animated.Text>

                <Animated.View style={stylesModal.inputContainer} entering={ZoomIn.delay(300).duration(800)}>
                  <AnimatedInput
                    label="Email"
                    iconName="email"
                    value={emailAlt}
                    onChangeText={setEmailAlt}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </Animated.View>

                <Animated.View style={stylesModal.buttons} entering={ZoomIn.delay(350).duration(800)}>
                  <TouchableOpacity
                    style={stylesModal.cancelButton}
                    onPress={() => setModalOpen(false)}
                  >
                    <Text style={stylesModal.cancelText}>
                      Cancelar
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={stylesModal.confirmButton}
                    onPress={() => {
                      Keyboard.dismiss();
                      console.log(emailAlt);
                    }}
                  >
                    <Text style={stylesModal.confirmText}>
                      Confirmar
                    </Text>
                  </TouchableOpacity>
                </Animated.View>

              </Animated.View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

        </Animated.View>
      )}

    </View>
  );
}