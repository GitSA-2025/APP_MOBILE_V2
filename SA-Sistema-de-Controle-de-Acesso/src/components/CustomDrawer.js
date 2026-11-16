import React, { useCallback, useState, useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

export default function CustomDrawer(props) {
  const navigation = useNavigation();
  const drawerStatus = useDrawerStatus();

  const [userEmail, setUserEmail] = useState(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fotoUrl, setFotoUrl] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userEmail").then(setUserEmail);
  }, []);

  const fetchConta = useCallback(async (emailBusca) => {
    if (!emailBusca) return;
    try {
      const res = await api.post("/api/mobile/app/conta", {
        user_email: emailBusca,
      });
      const usuario = res.data;

      setNome(usuario.name || "");
      setEmail(usuario.user_email || "");
      setFotoUrl(usuario.photo_url || null);
    } catch (err) {
      console.error("Erro ao carregar conta no menu:", err.response?.data || err);
    }
  }, []);

  // Atualiza quando o drawer ganha foco ou é aberto pelo usuário
  useFocusEffect(
    useCallback(() => {
      if (userEmail) {
        fetchConta(userEmail);
      }
    }, [userEmail, fetchConta])
  );

  useEffect(() => {
    if (drawerStatus === "open" && userEmail) {
      fetchConta(userEmail);
    }
  }, [drawerStatus, userEmail, fetchConta]);

  function sair() {
    AsyncStorage.multiRemove(["userToken", "userEmail"]);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {fotoUrl ? (
          <Image
            style={styles.avatar}
            source={{ uri: fotoUrl }}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <View style={styles.avatarIconBox}>
              <MaterialCommunityIcons
                name="account"
                size={46}
                color="#27445B"
              />
            </View>
          </View>
        )}

        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <TouchableOpacity
        style={styles.btnSair}
        onPress={sair}
        activeOpacity={0.7}
      >
        <Text style={styles.btnSairTexto}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },

  drawerContent: {
    paddingTop: 0,
  },

  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DDD",
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#27445B",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  avatarIconBox: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  email: {
    color: "#d1d1d1",
    marginTop: 5,
  },

  btnSair: {
    alignSelf: "flex-end",
    backgroundColor: "#8E2927",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 20,
    marginBottom: 20,
  },

  btnSairTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});