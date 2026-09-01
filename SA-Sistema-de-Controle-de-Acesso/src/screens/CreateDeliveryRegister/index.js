import { View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons';

import AnimatedInput from "../../components/AnimatedInput";
import AnimatedSelect from '../../components/AnimatedSelect';
import PhotoPicker from '../../components/PhotoPicker';

import { useNavigation } from '@react-navigation/native';

import Animated, { ZoomIn, Easing, withTiming } from 'react-native-reanimated';

import styles from '../../Styles/stylesForm';

export default function CreateDeliveryRegister() {

    const navigation = useNavigation();

    const [nome, setNome] = useState("");
    const [placa, setPlaca] = useState("");
    const [hrEntrada, setHrEntrada] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nNota, setNNota] = useState("");
    const [foto, setFoto] = useState(null);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={styles.container}>
                    <StatusBar style="inverted" />
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scroll}
                    >
                        {/* PopUp */}
                        <Animated.View style={styles.popup} entering={ZoomIn.duration(800)}>
                            {/* Cabeçalho */}
                            <Animated.View style={styles.header} entering={ZoomIn.delay(200).duration(800)}>
                                <TouchableOpacity onPress={() => {
                                    navigation.replace("App", {
                                        screen: "DeliveryRegister"
                                    })
                                }}>
                                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={styles.h1}>Registro de Entrega</Text>
                            </Animated.View>

                            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(250).duration(800)}>
                                <AnimatedInput
                                    label="Nome"
                                    iconName="account"
                                    value={nome}
                                    onChangeText={setNome}
                                />

                                <AnimatedInput
                                    label="Placa"
                                    iconName="car-back"
                                    mask="plate"
                                    value={nome}
                                    onChangeText={setNome}
                                />
                                <AnimatedInput
                                    label="Hr. Entrada"
                                    iconName="clock-outline"
                                    value={nome}
                                    onChangeText={setNome}
                                />
                                <AnimatedInput
                                    label="Fornecedor"
                                    iconName="store"
                                    value={nome}
                                    onChangeText={setNome}
                                />
                                <AnimatedInput
                                    label="Telefone"
                                    iconName="phone"
                                    value={nome}
                                    onChangeText={setNome}
                                    mask="phone"
                                />
                                <AnimatedInput
                                    label="Nº da Nota"
                                    iconName="file-document-multiple-outline"
                                    value={nome}
                                    onChangeText={setNome}
                                />
                            </Animated.View>

                            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(300).duration(800)}>
                                <TouchableOpacity style={styles.btnSalvar}>
                                    <Text style={styles.textBtn}>
                                        Salvar
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>

                        </Animated.View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}