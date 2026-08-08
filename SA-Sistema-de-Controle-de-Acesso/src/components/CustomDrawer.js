import React from "react";

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

import { useNavigation } from '@react-navigation/native';

export default function CustomDrawer(props) {

    const navigation = useNavigation();

    const usuario = {
        nome: "Maria",
        email: "maria@gmail.com",
        foto: "https://i.pravatar.cc/150?img=32",
    };

    function sair() {
        navigation.replace("Login");
    }

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Image
                    style={styles.avatar}
                    source={{ uri: usuario.foto }}
                />

                <Text style={styles.nome}>
                    {usuario.nome}
                </Text>

                <Text style={styles.email}>
                    {usuario.email}
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