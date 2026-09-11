import { View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import AnimatedInput from "../../components/AnimatedInput";
import AnimatedSelect from '../../components/AnimatedSelect';
import PhotoPicker from '../../components/PhotoPicker';
import LoadingOverlay from '../../components/LoadingOverlay';

import api from '../../api/api';

import { useNavigation } from '@react-navigation/native';

import Animated, { ZoomIn, Easing, withTiming } from 'react-native-reanimated';

import styles from '../../Styles/stylesForm';

export default function CreateEntryRegister() {

    const navigation = useNavigation();

    const [userEmail, setUserEmail] = useState();

    useEffect(() => {
        AsyncStorage.getItem('userEmail').then(setUserEmail);
    }, []);

    const [nome, setNome] = useState("");
    const [tipoPessoa, setTipoPessoa] = useState("");
    const [cpf, setCpf] = useState("");
    const [data, setData] = useState("");
    const [hrEntrada, setHrEntrada] = useState("");
    const [placa, setPlaca] = useState("");
    const [foto, setFoto] = useState(null);

    const [loading, setLoading] = useState(false);

    function getDataHoraAtual() {
        // Função que retorna a data e hora atual formatadas
        const now = new Date();

        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const ano = now.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;

        const horas = String(now.getHours()).padStart(2, '0');
        const minutos = String(now.getMinutes()).padStart(2, '0');
        const segundos = String(now.getSeconds()).padStart(2, '0');
        const horaFormatada = `${horas}:${minutos}:${segundos}`;

        return { dataFormatada, horaFormatada };
    }

    useEffect(() => {
        const { dataFormatada, horaFormatada } = getDataHoraAtual();
        setData(dataFormatada);
        setHrEntrada(horaFormatada);
    }, []);

    async function registrar(nome, tipo, cpf, placa, user_email) {
        // Função que envia os dados do registro para a API
        const dados = { nome, tipo, cpf, placa, user_email };

        try {
            const res = await api.post('/api/mobile/app/criarRegistroEntrada', dados);
            return res.data;
        } catch (err) {
            console.error('Erro ao cadastrar:', err.response?.data || err.message);
            throw err;
        }
    }

    const handleSalvar = async () => {
        // Função chamada ao pressionar o botão "Salvar"
        if (!nome || !cpf || !tipoPessoa) {
            // Valida campos obrigatórios
            Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
            return;
        }
        if (loading) return;
        // Evita múltiplos envios simultâneos
        setLoading(true);
        try {
            await registrar(nome, tipoPessoa, cpf, placa, userEmail);
            Alert.alert('Sucesso', 'Registro salvo com sucesso! Retornando para tela inicial.');
            navigation.replace("App", {
                screen: "Home"
            })
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível realizar o registro. Tente novamente.');
        }
        finally {
            setLoading(false);
        }
    };

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
                                <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
                                    <Text style={styles.textBtn}>
                                        Salvar
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>


                        </Animated.View>
                    </ScrollView>
                    <LoadingOverlay visible={loading} text="Carregando..." />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}