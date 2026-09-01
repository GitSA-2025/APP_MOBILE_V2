import React, { useCallback, useState } from "react";

import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import api from '../api/api';

import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CustomDrawer(props) {

    const navigation = useNavigation();

    const route = useRoute();

    const { user_email } = route.params;

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dados, setDados] = useState({});

    async function fetchConta(email) {
        try {
            const res = await api.post('/api/mobile/app/conta', { user_email: email });
            const usuario = res.data;

            setDados(usuario);
            setNome(usuario.name);
            setEmail(usuario.user_email);

        } catch (err) {
            console.error('Erro ao carregar conta:', err.response?.data);
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (user_email) {
                fetchConta(user_email);
            }
        }, [user_email])
    );

    const usuario = {
        foto: "https://i.pravatar.cc/150?img=32",
    };

    function sair() {
        AsyncStorage.removeItem('userToken');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={{ uri: usuario.foto }}
                />

                <Text style={styles.nome}>
                    {nome}
                </Text>

                <Text style={styles.email}>
                    {email}
                </Text>
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
                <Text style={styles.btnSairTexto}>
                    Sair
                </Text>
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