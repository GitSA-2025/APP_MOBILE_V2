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

export default function CreateEntryRegister() {

    const navigation = useNavigation();

    const [nome, setNome] = useState("");
    const [tipoPessoa, setTipoPessoa] = useState("");
    const [cpf, setCpf] = useState("");
    const [data, setData] = useState("");
    const [hrEntrada, setHrEntrada] = useState("");
    const [placa, setPlaca] = useState("");
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
                                        screen: "Home"
                                    })
                                }}>
                                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={styles.h1}>Registro de Entrada</Text>
                            </Animated.View>

                            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(250).duration(800)}>
                                <AnimatedInput
                                    label="Nome"
                                    iconName="account"
                                    value={nome}
                                    onChangeText={setNome}
                                />
                                <AnimatedSelect
                                    label="Tipo de pessoa"
                                    iconName="account-group"
                                    value={tipoPessoa}
                                    onValueChange={setTipoPessoa}
                                    options={[
                                        {
                                            label: "Colaborador",
                                            value: "colaborador",
                                            icon: "account-tie",
                                        },
                                        {
                                            label: "Visitante",
                                            value: "visitante",
                                            icon: "badge-account",
                                        },
                                    ]}
                                />
                                <AnimatedInput
                                    label="CPF"
                                    iconName="badge-account-horizontal"
                                    mask="cpf"
                                    value={cpf}
                                    onChangeText={setCpf}
                                />
                                <AnimatedInput
                                    label="Data"
                                    iconName="calendar-month"
                                    value={data}
                                    onChangeText={setData}
                                />
                                <AnimatedInput
                                    label="Hr. Entrada"
                                    iconName="clock-outline"
                                    value={hrEntrada}
                                    onChangeText={setHrEntrada}
                                />
                                <AnimatedInput
                                    label="Placa"
                                    iconName="car-back"
                                    mask="plate"
                                    value={placa}
                                    onChangeText={setPlaca}
                                />

                                {
                                    tipoPessoa === "visitante" &&
                                    <PhotoPicker onChange={setFoto} />
                                }
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