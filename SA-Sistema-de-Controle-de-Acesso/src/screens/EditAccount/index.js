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
              <View style={styles.popup}>

                <View style={styles.header}>
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
                </View>

                <View style={{ margin: 24 }}>
                  <PhotoPickerAccount onChange={setFoto} />
                </View>

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

                <TouchableOpacity
                  style={stylesModal.openButton}
                  onPress={() => setModalOpen(true)}
                >
                  <Text style={stylesModal.openButtonText}>
                    Alterar senha
                  </Text>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {modalOpen && (
        <View style={stylesModal.overlay}>

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
              <View style={stylesModal.modalBox}>

                <View style={stylesModal.modalHeader}>
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
                </View>

                <Text style={stylesModal.description}>
                  Insira o e-mail da conta para efetuar a alteração da senha.
                </Text>

                <View style={stylesModal.inputContainer}>
                  <AnimatedInput
                    label="Email"
                    iconName="email"
                    value={emailAlt}
                    onChangeText={setEmailAlt}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={stylesModal.buttons}>
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
                </View>

              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

        </View>
      )}

    </View>
  );
}