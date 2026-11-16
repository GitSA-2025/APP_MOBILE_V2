import { View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons';

import AnimatedInput from "../../components/AnimatedInput";
import LoadingOverlay from '../../components/LoadingOverlay';

import api from '../../api/api';

import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, { ZoomIn } from 'react-native-reanimated';

import styles from '../../Styles/stylesForm';
import editStyles from '../../Styles/stylesEdit';
import modalStyles from '../../Styles/stylesRegister';

// Senha de supervisor exigida para excluir um registro
const SENHA_SUPERVISOR = "admin";

export default function EditDeliveryRegister() {

    const navigation = useNavigation();
    const route = useRoute();
    const { entry } = route.params; // Registro selecionado na lista

    // Valores iniciais vêm da linha da lista; o restante é carregado da API
    const [nome, setNome] = useState(entry?.name || "");
    const [placa, setPlaca] = useState(entry?.plate_vehicle || "");
    const [hrEntrada, setHrEntrada] = useState(entry?.hr_entry || "");
    const [fornecedor, setFornecedor] = useState(entry?.industry || "");
    const [telefone, setTelefone] = useState("");
    const [nNota, setNNota] = useState("");
    const [data, setData] = useState(entry?.date_fixed || "");

    const [senha, setSenha] = useState("");
    const [visibleModalDelete, setVisibleModalDelete] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Carrega os dados completos do registro
        let isActive = true;

        async function fetchDados() {
            setLoading(true);
            try {
                const res = await api.get(`/api/mobile/app/exibirEntregas/${entry.idregister}`);
                const d = res.data;
                if (!isActive || !d) return;

                setNome(d.nome || '');
                setFornecedor(d.industria || '');
                setTelefone(d.telefone || d.cpf || '');
                setPlaca(d.placa || '');
                setHrEntrada(d.hrentrada || '');
                setNNota(d.n_nota ? String(d.n_nota) : '');
                if (d.data) setData(d.data);
            } catch (err) {
                console.error('Erro ao carregar registro:', err.response?.data || err.message);
                Alert.alert('Erro', 'Não foi possível carregar os dados do registro.');
            } finally {
                if (isActive) setLoading(false);
            }
        }

        fetchDados();
        return () => { isActive = false; };
    }, [entry.idregister]);

    async function editar(idRegister, nome, fornecedor, telefone, placa, nNota, hrEntrada) {
        // Envia os dados editados para a API
        const dados = {
            nome,
            telefone,
            placa,
            industria: fornecedor,
            n_fiscal: nNota,
            hrentrada: hrEntrada,
        };

        try {
            const res = await api.post(`/api/mobile/app/editarRegistroEntrega/${idRegister}`, dados);
            return res.data;
        } catch (err) {
            console.error('Erro ao editar:', err.response?.data || err.message);
            throw err;
        }
    }

    const handleSalvar = async () => {
        if (!nome || !fornecedor || !telefone || !placa || !nNota) {
            Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
            return;
        }
        if (loading) return; // Evita múltiplos envios simultâneos
        setLoading(true);

        try {
            await editar(entry.idregister, nome, fornecedor, telefone, placa, nNota, hrEntrada);
            Alert.alert('Sucesso', 'Registro editado com sucesso! Retornando para tela inicial.');
            navigation.replace("App", {
                screen: "DeliveryRegister"
            });
        } catch (err) {
            Alert.alert('Erro', 'Não foi possível realizar a edição. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    async function deletar(idregister) {
        try {
            const res = await api.get(`/api/mobile/app/deletarRegistroEntrega/${idregister}`);
            return res.data;
        } catch (err) {
            console.error('Erro ao excluir registro:', err.response?.data || err.message);
            throw err;
        }
    }

    const handleDeletar = async () => {
        if (senha !== SENHA_SUPERVISOR) {
            Alert.alert('Atenção', 'Senha inválida!');
            return;
        }
        if (loading) return;
        setLoading(true);

        try {
            await deletar(entry.idregister);
            setVisibleModalDelete(false);
            Alert.alert('Sucesso', 'Registro deletado com sucesso! Retornando para tela inicial.');
            navigation.replace("App", {
                screen: "DeliveryRegister"
            });
        } catch (err) {
            setVisibleModalDelete(false);
            Alert.alert('Erro', 'Não foi possível deletar o registro. Tente novamente.');
        } finally {
            setLoading(false);
            setSenha("");
        }
    };

    function fecharModal() {
        setVisibleModalDelete(false);
        setSenha("");
    }

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
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name="arrow-back-outline" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={styles.h1}>Editar Registro de Entrega</Text>
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
                                    mask="phone"
                                    value={telefone}
                                    onChangeText={setTelefone}
                                />
                                <AnimatedInput
                                    label="Nº da Nota"
                                    iconName="file-document-multiple-outline"
                                    value={nNota}
                                    onChangeText={setNNota}
                                    keyboardType="numeric"
                                />
                                <AnimatedInput
                                    label="Data"
                                    iconName="calendar-month"
                                    value={data}
                                    onChangeText={setData}
                                    editable={false}
                                />
                                <AnimatedInput
                                    label="Hr. Entrada"
                                    iconName="clock-outline"
                                    value={hrEntrada}
                                    onChangeText={setHrEntrada}
                                    editable={false}
                                />
                            </Animated.View>

                            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(300).duration(800)}>
                                <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
                                    <Text style={styles.textBtn}>
                                        Salvar
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={editStyles.btnDeletar} onPress={() => setVisibleModalDelete(true)}>
                                    <Text style={editStyles.textBtnDeletar}>
                                        Deletar registro
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>

                        </Animated.View>
                    </ScrollView>

                    {visibleModalDelete && (
                        // Modal de confirmação de exclusão
                        <View style={modalStyles.modalOverlay}>
                            <View style={modalStyles.modalContainer}>
                                <TouchableOpacity style={editStyles.modalClose} onPress={fecharModal}>
                                    <Ionicons name="close" size={30} color="#8E2927" />
                                </TouchableOpacity>
                                <Text style={modalStyles.modalText}>
                                    Insira a senha de um supervisor para confirmar a exclusão do registro:
                                </Text>

                                <View style={editStyles.modalInput}>
                                    <AnimatedInput
                                        label="Senha"
                                        iconName="lock"
                                        value={senha}
                                        onChangeText={setSenha}
                                        secureTextEntry
                                    />
                                </View>

                                <View style={modalStyles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[modalStyles.button, modalStyles.cancelButton]}
                                        onPress={fecharModal}
                                    >
                                        <Text style={modalStyles.buttonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[modalStyles.button, modalStyles.confirmButton]}
                                        onPress={handleDeletar}
                                    >
                                        <Text style={modalStyles.buttonText}>Confirmar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                    <LoadingOverlay visible={loading} text="Carregando..." />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}