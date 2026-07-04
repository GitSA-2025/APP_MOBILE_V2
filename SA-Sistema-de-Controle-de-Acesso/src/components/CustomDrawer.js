import React from "react";

import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";

import { View, Text, Image, StyleSheet } from "react-native";

export default function CustomDrawer(props) {
    const usuario = {
        nome: "Maria",
        email: "maria@gmail.com",
        foto: "https://i.pravatar.cc/150?img=32",
    };

    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Image style={styles.avatar} source={{ uri: usuario.foto}}/>

                <Text style={styles.nome}>
                    {usuario.nome}
                </Text>

                <Text style={styles.email}>
                    {usuario.email}
                </Text>
            </View>

            <DrawerItemList {...props}/>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({

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
    },

    email: {
        color: "#666",
        marginTop: 5,
    },

});