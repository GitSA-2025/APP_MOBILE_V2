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
  Alert,
  ActivityIndicator,
} from "react-native";

import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AnimatedInput from "../../components/AnimatedInput";
import PhotoPickerAccount from "../../components/PhotoPickerAccount";
import api from "../../api/api";

import styles from "../../Styles/stylesForm";
import stylesModal from "../../Styles/stylesModal";

import { useNavigation } from "@react-navigation/native";
import Animated, { ZoomIn } from "react-native-reanimated";

export default function EditAccount() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fotoInicial, setFotoInicial] = useState(null);
  const [fotoAlteracao, setFotoAlteracao] = useState(null); // { uri, base64, removed }

  const [loadingDados, setLoadingDados] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [emailAlt, setEmailAlt] = useState("");

  useEffect(() => {
    carregarConta();
  }, []);

  function extrairEmailDoToken(token) {
    try {
      const payloadBase64 = token
        .split(".")[1]
        .replace(/-/g, "+")
        .replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(payloadBase64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload)?.email || null;
    } catch {
      return null;
    }
  }

  async function carregarConta() {
    try {
      setLoadingDados(true);
      const token = await AsyncStorage.getItem("userToken");
      const emailToken = extrairEmailDoToken(token);

      if (!emailToken) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        return;
      }

      const response = await api.post("/api/mobile/app/conta", {
        user_email: emailToken,
      });

      setNome(response.data.name || "");
      setEmail(response.data.user_email || emailToken);
      setEmailAlt(response.data.user_email || emailToken);
      setTelefone(response.data.phone || "");
      setFotoInicial(response.data.photo_url || null);
    } catch (error) {
      console.error(
        "Erro ao carregar conta:",
        error?.response?.status,
        error?.response?.data || error
      );
      Alert.alert(
        "Erro",
        error?.response?.data?.error ||
          "Não foi possível carregar os dados da conta."
      );
    } finally {
      setLoadingDados(false);
    }
  }

  async function handleSalvar() {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Preencha o nome.");
      return;
    }

    try {
      setSalvando(true);

      // 1. Atualiza nome (e mantém telefone/user_email atuais) na rota já publicada /editarPerfil
      await api.post("/api/mobile/app/editarPerfil", {
        nome: nome.trim(),
        telefone: telefone,
        user_email: email.trim(),
      });

      // 2. Atualiza ou remove a foto de perfil, se houve alteração no PhotoPickerAccount
      if (fotoAlteracao?.removed && fotoInicial) {
        const resRem = await api.post("/api/mobile/app/removerFoto", {});
        setFotoInicial(resRem.data.photo_url);
        setFotoAlteracao(null);
      } else if (fotoAlteracao?.base64) {
        const resFoto = await api.post("/api/mobile/app/atualizarFoto", {
          foto_base64: fotoAlteracao.base64,
        });
        setFotoInicial(resFoto.data.photo_url);
        setFotoAlteracao(null);
      }

      Alert.alert("Sucesso", "Dados da conta atualizados!");
    } catch (error) {
      console.error(
        "Erro ao salvar conta:",
        error?.response?.status,
        error?.response?.data || error
      );
      Alert.alert(
        "Erro",
        error?.response?.data?.error || "Não foi possível salvar as alterações."
      );
    } finally {
      setSalvando(false);
    }
  }

  function handleConfirmarSenha() {
    Keyboard.dismiss();
    if (!emailAlt.trim()) {
      Alert.alert("Atenção", "Informe o e-mail da conta.");
      return;
    }

    Alert.alert(
      "Aviso",
      "A rota de alteração de senha ainda precisa ser publicada no Cloudflare Worker para enviar o código."
    );
    setModalOpen(false);
  }

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
                <Animated.View
                  style={styles.header}
                  entering={ZoomIn.delay(200).duration(800)}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.replace("App", { screen: "Home" });
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

                {loadingDados ? (
                  <View style={{ paddingVertical: 60 }}>
                    <ActivityIndicator size="large" color="#A52A2A" />
                  </View>
                ) : (
                  <>
                    <Animated.View
                      style={{ margin: 24 }}
                      entering={ZoomIn.delay(250).duration(800)}
                    >
                      <PhotoPickerAccount
                        initialImage={fotoInicial}
                        onChange={setFotoAlteracao}
                      />
                    </Animated.View>

                    <Animated.View
                      style={{ width: "100%", marginTop: 12 }}
                      entering={ZoomIn.delay(250).duration(800)}
                    >
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
                        editable={false}
                      />
                    </Animated.View>

                    <Animated.View
                      style={{ width: "100%", marginTop: 12 }}
                      entering={ZoomIn.delay(300).duration(800)}
                    >
                      <TouchableOpacity
                        style={styles.btnSalvar}
                        onPress={handleSalvar}
                        disabled={salvando}
                      >
                        <Text style={styles.textBtn}>
                          {salvando ? "Salvando..." : "Salvar"}
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                      style={{ width: "100%", marginTop: 12 }}
                      entering={ZoomIn.delay(350).duration(800)}
                    >
                      <TouchableOpacity
                        style={stylesModal.openButton}
                        onPress={() => setModalOpen(true)}
                      >
                        <Text style={stylesModal.openButtonText}>
                          Alterar senha
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  </>
                )}
              </Animated.View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      {modalOpen && (
        <Animated.View style={stylesModal.overlay} entering={ZoomIn.duration(400)}>
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
              <Animated.View style={stylesModal.modalBox} entering={ZoomIn.duration(400)}>
                <View style={stylesModal.modalHeader}>
                  <Text style={stylesModal.modalTitle}>Alterar senha</Text>

                  <TouchableOpacity
                    style={stylesModal.closeButton}
                    onPress={() => setModalOpen(false)}
                  >
                    <Ionicons name="close" size={30} color="#333" />
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
                    <Text style={stylesModal.cancelText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={stylesModal.confirmButton}
                    onPress={handleConfirmarSenha}
                  >
                    <Text style={stylesModal.confirmText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Animated.View>
      )}
    </View>
  );
}