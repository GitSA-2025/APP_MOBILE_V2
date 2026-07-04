import { View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons';

import AnimatedInput from "../../components/AnimatedInput";
import AnimatedSelect from '../../components/AnimatedSelect';
import PhotoPicker from '../../components/PhotoPicker';

import { useNavigation } from '@react-navigation/native';

import styles from '../../Styles/stylesForm';

export default function CreateEntryRegister() {

    const navigation = useNavigation();

    const [nome, setNome] = useState("");
    const [tipoPessoa, setTipoPessoa] = useState("");
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
                        <View style={styles.popup}>
                            {/* Cabeçalho */}
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("App", {
                                        screen: "Home"
                                    })
                                }}>
                                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={styles.h1}>Registro de Entrada</Text>
                            </View>

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
                                value={nome}
                                onChangeText={setNome}
                            />
                            <AnimatedInput
                                label="Data"
                                iconName="calendar-month"
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
                                label="Placa"
                                iconName="car-back"
                                mask="plate       "
                                value={nome}
                                onChangeText={setNome}
                            />

                            {
                                tipoPessoa === "visitante" &&
                                <PhotoPicker onChange={setFoto} />
                            }

                            <TouchableOpacity style={styles.btnSalvar}>
                                <Text style={styles.textBtn}>
                                    Salvar
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}