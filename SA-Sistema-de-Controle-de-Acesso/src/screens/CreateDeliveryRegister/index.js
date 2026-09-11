import { View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons';

import AnimatedInput from "../../components/AnimatedInput";
import LoadingOverlay from '../../components/LoadingOverlay';

import api from '../../api/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

import Animated, { ZoomIn, Easing, withTiming } from 'react-native-reanimated';

import styles from '../../Styles/stylesForm';

export default function CreateDeliveryRegister() {

    const navigation = useNavigation();

    const [userEmail, setUserEmail] = useState();

    useEffect(() => {
        AsyncStorage.getItem('userEmail').then(setUserEmail);
    }, []);

    const [nome, setNome] = useState("");
    const [placa, setPlaca] = useState("");
    const [hrEntrada, setHrEntrada] = useState("");
    const [fornecedor, setFornecedor] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nNota, setNNota] = useState("");
    const [data, setData] = useState("")

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

    async function registrar(nome, fornecedor, telefone, placa, nNota, userEmail) {
        // Função para enviar dados ao backend
        const dados = {
            nome,
            telefone,
            placa,
            industria: fornecedor,
            n_fiscal: nNota,
            user_email: userEmail
        };

        try {
            const res = await api.post('/api/mobile/app/criarRegistroEntrega', dados);
            return res.data; // Retorna a resposta da API
        } catch (err) {
            console.error('Erro ao cadastrar:', err.response?.data || err.message);
            console.log(dados); // Log dos dados para debug
            throw err; // Propaga o erro
        }
    }

    const handleSalvar = async () => {
        // Função chamada ao clicar em "Salvar"
        if (!nome || !fornecedor || !telefone || !placa || !nNota) {
            // Valida se todos os campos obrigatórios estão preenchidos
            Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
            return;
        }

        if (loading) return; // Evita múltiplos cliques
        setLoading(true); // Ativa overlay de loading

        try {
            await registrar(nome, fornecedor, telefone, placa, nNota, userEmail);
            Alert.alert('Sucesso', 'Registro salvo com sucesso! Retornando para tela inicial.');
            navigation.replace("App", {
                screen: "DeliveryRegister"
            }) // Retorna à tela anterior
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível realizar o registro. Tente novamente.');
        }
        finally {
            setLoading(false); // Desativa overlay
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
                                    value={placa}
                                    onChangeText={setPlaca}
                                />
                                <AnimatedInput
                                    label="Fornecedor"
                                    iconName="store"
                                    value={fornecedor}
                                    onChangeText={setFornecedor}
                                />
                                <AnimatedInput
                                    label="Telefone"
                                    iconName="phone"
                                    value={telefone}
                                    onChangeText={setTelefone}
                                    mask="phone"
                                />
                                <AnimatedInput
                                    label="Nº da Nota"
                                    iconName="file-document-multiple-outline"
                                    value={nNota}
                                    onChangeText={setNNota}
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