import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PhotoPickerAccount({ onChange }) {

    const [image, setImage] = useState(null);

    async function camera() {

        const permission =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permissão necessária",
                "Permita o acesso à câmera para tirar uma foto."
            );

            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            setImage(imageUri);
            onChange?.(imageUri);
        }
    }

    async function gallery() {

        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            Alert.alert(
                "Permissão necessária",
                "Permita o acesso à galeria para selecionar uma foto."
            );

            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;

            setImage(imageUri);
            onChange?.(imageUri);
        }
    }

    function removeImage() {
        setImage(null);
        onChange?.(null);
    }

    function editPhoto() {

        const options = image
            ? [
                {
                    text: "Câmera",
                    onPress: camera,
                },
                {
                    text: "Galeria",
                    onPress: gallery,
                },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: removeImage,
                },
            ]
            : [
                {
                    text: "Câmera",
                    onPress: camera,
                },
                {
                    text: "Galeria",
                    onPress: gallery,
                },
                {
                    text: "Cancelar",
                    style: "cancel",
                },
            ];

        Alert.alert(
            image ? "Editar foto" : "Adicionar foto",
            "Escolha uma opção",
            options,
            {
                cancelable: true,
            }
        );
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.photoContainer}
                onPress={editPhoto}
                activeOpacity={0.85}
            >
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.placeholder}>

                        <View style={styles.iconBox}>
                            <MaterialCommunityIcons
                                name="account"
                                size={92}
                                color="#27445B"
                            />
                        </View>

                    </View>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.editButton}
                onPress={editPhoto}
                activeOpacity={0.8}
            >
                <MaterialCommunityIcons
                    name="pencil"
                    size={19}
                    color="#FFFFFF"
                />

                <Text style={styles.editButtonText}>
                    Editar foto
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },

    photoContainer: {
        width: 190,
        height: 190,
        borderRadius: 95,
        overflow: "hidden",
    },

    placeholder: {
        width: "100%",
        height: "100%",
        borderRadius: 95,
        backgroundColor: "#27445B",
        alignItems: "center",
        justifyContent: "center",
    },

    iconBox: {
        width: 118,
        height: 118,
        borderRadius: 13,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
        borderRadius: 95,
    },

    editButton: {
        minWidth: 145,
        height: 34,
        marginTop: 16,
        paddingHorizontal: 14,
        borderRadius: 6,
        backgroundColor: "#A52A2A",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        elevation: 2,

        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
    },

    editButtonText: {
        marginLeft: 10,
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

});