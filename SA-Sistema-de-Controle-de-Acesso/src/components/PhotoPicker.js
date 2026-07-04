import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PhotoPicker({ onChange }) {

    const [image, setImage] = useState(null);

    async function camera() {

        const permission =
            await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) return;

        const result =
            await ImagePicker.launchCameraAsync({
                quality: 0.8,
            });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onChange?.(result.assets[0].uri);
        }
    }

    async function gallery() {

        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) return;

        const result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                quality: 0.8,
            });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            onChange?.(result.assets[0].uri);
        }
    }

    function removeImage() {
        Alert.alert(
            "Remover foto",
            "Deseja remover a foto?",
            [
                {
                    text: "Cancelar"
                },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: () => {
                        setImage(null);
                        onChange?.(null);
                    }
                }
            ]
        );
    }

    return (

        <View style={styles.card}>

            {
                image ?

                    <Image
                        source={{ uri: image }}
                        style={styles.image}
                        resizeMode="cover"
                    />

                    :

                    <View style={styles.placeholder}>

                        <MaterialCommunityIcons
                            name="account-box"
                            size={65}
                            color="#27445B"
                        />

                        <Text style={styles.title}>
                            Foto de identificação
                        </Text>

                        <Text style={styles.subtitle}>
                            Tire uma foto ou escolha da galeria
                        </Text>

                    </View>

            }

            <View style={styles.buttons}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={camera}
                >

                    <MaterialCommunityIcons
                        name="camera"
                        color="#FFF"
                        size={20}
                    />

                    <Text style={styles.buttonText}>
                        {image ? "Alterar" : "Tirar foto"}
                    </Text>

                </TouchableOpacity>

                {
                    image ?

                        <TouchableOpacity
                            style={[styles.button, styles.remove]}
                            onPress={removeImage}
                        >

                            <MaterialCommunityIcons
                                name="delete"
                                color="#FFF"
                                size={20}
                            />

                            <Text style={styles.buttonText}>
                                Remover
                            </Text>

                        </TouchableOpacity>

                        :

                        <TouchableOpacity
                            style={styles.button}
                            onPress={gallery}
                        >

                            <MaterialCommunityIcons
                                name="image"
                                color="#FFF"
                                size={20}
                            />

                            <Text style={styles.buttonText}>
                                Galeria
                            </Text>

                        </TouchableOpacity>

                }

            </View>

        </View>

    );

}

const styles = StyleSheet.create({

    card: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 12,
        overflow: "hidden",
        marginTop: 15,
        backgroundColor: "#FFF",
    },

    placeholder: {

        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 30

    },

    image: {

        width: "100%",
        height: 220,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,

    },

    title: {

        marginTop: 10,
        fontSize: 18,
        fontWeight: "600",
        color: "#27445B"

    },

    subtitle: {

        color: "#777",
        marginTop: 5

    },

    buttons: {

        flexDirection: "row",
        borderTopWidth: 1,
        borderColor: "#EEE"

    },

    button: {

        flex: 1,
        backgroundColor: "#27445B",
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"

    },

    remove: {
        backgroundColor: "#C62828"
    },

    buttonText: {
        color: "#FFF",
        marginLeft: 8,
        fontWeight: "600"
    }

});