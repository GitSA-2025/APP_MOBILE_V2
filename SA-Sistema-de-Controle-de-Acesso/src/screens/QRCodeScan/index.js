import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, useCameraPermissions } from 'expo-camera';

import LoadingOverlay from '../../components/LoadingOverlay';

import api from '../../api/api';

import { useNavigation, useIsFocused } from '@react-navigation/native';

import Animated, { ZoomIn } from 'react-native-reanimated';

import styles from '../../Styles/stylesQRCodeScan';

export default function QRCodeScan() {

    const navigation = useNavigation();
    const isFocused = useIsFocused(); // Só mantém a câmera ativa com a tela em foco

    const [userEmail, setUserEmail] = useState();

    useEffect(() => {
        AsyncStorage.getItem('userEmail').then(setUserEmail);
    }, []);

    // Permissão da câmera (hook do expo-camera)
    const [permission, requestPermission] = useCameraPermissions();
    // Controla se um QR Code já foi lido
    const [scanned, setScanned] = useState(false);
    // Dados do QR Code lido
    const [qrData, setQrData] = useState(null);
    // Loading durante requisições
    const [loading, setLoading] = useState(false);
    // Lanterna da câmera
    const [torch, setTorch] = useState(false);

    // Solicita permissão da câmera assim que a tela é montada
    useEffect(() => {
        if (permission && !permission.granted && permission.canAskAgain) {
            requestPermission();
        }
    }, [permission]);

    function voltar() {
        navigation.goBack();
    }

    function resetarLeitura() {
        setScanned(false);
        setQrData(null);
    }

    const handleBarcodeScanned = ({ data }) => {
        // Função chamada quando um QR Code é detectado
        if (scanned) return; // Se já leu um QR Code, ignora

        try {
            const parsed = JSON.parse(data); // Converte o QR Code (JSON) para objeto
            if (!parsed || typeof parsed !== 'object') throw new Error('invalid');
            setQrData(parsed);
            setScanned(true);
        } catch {
            setScanned(true); // trava novas leituras enquanto o alerta está aberto
            Alert.alert('Erro', 'QR Code inválido.', [
                { text: 'OK', onPress: () => setScanned(false) },
            ]);
        }
    };

    async function confirmarEntrada() {
        if (loading) return; // Evita múltiplos envios simultâneos
        setLoading(true);

        try {
            const qrId = qrData?.qrId || null;

            // 1. Valida o QR Code
            await api.post('/api/validar-qrcode', { qrId });

            // 2. Se chegou aqui, é válido: cria o registro de entrada
            const dados = {
                nome: qrData.name,
                tipo: qrData.type_user,
                cpf: qrData.cpf,
                placa: qrData.plate,
                user_email: userEmail,
            };

            await api.post('/api/mobile/app/criarRegistroEntrada', dados);

            resetarLeitura();
            Alert.alert('Sucesso', 'Entrada registrada com sucesso!');
            navigation.replace("App", {
                screen: "Home"
            });
        } catch (err) {
            const msg = err.response?.data?.error || err.message;

            if (msg === 'QR Code já utilizado') {
                Alert.alert('QR Code inválido', 'Esse QR Code já foi utilizado.');
            } else if (msg === 'QR Code expirado') {
                Alert.alert('QR Code vencido', 'Esse QR Code já expirou.');
            } else if (msg === 'QR Code inválido') {
                Alert.alert('QR Code inválido', 'Esse QR Code não é válido.');
            } else {
                Alert.alert('Erro', 'Não foi possível validar o QR Code.');
            }
        } finally {
            setLoading(false);
        }
    }

    // Ainda carregando o estado da permissão
    if (!permission) {
        return (
            <View style={styles.centered}>
                <StatusBar style="inverted" />
                <LoadingOverlay visible={true} text="Solicitando permissão da câmera..." />
            </View>
        );
    }

    // Permissão negada
    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <StatusBar style="inverted" />
                <Ionicons name="camera-outline" size={56} color="#fff" />
                <Text style={styles.permissionText}>
                    Sem acesso à câmera. Permita o acesso para escanear o QR Code.
                </Text>
                {permission.canAskAgain && (
                    <TouchableOpacity style={styles.btnConfirmar} onPress={requestPermission}>
                        <Text style={styles.textBtn}>Permitir câmera</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.btnCancelar} onPress={voltar}>
                    <Text style={styles.textBtn}>Voltar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // QR Code lido: mostra os dados para confirmação
    if (scanned && qrData) {
        return (
            <View style={styles.container}>
                <StatusBar style="inverted" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scroll}
                >
                    {/* PopUp */}
                    <Animated.View style={styles.popup} entering={ZoomIn.duration(500)}>
                        {/* Cabeçalho */}
                        <View style={styles.header}>
                            <TouchableOpacity onPress={resetarLeitura}>
                                <Ionicons name="arrow-back-outline" size={24} color="black" />
                            </TouchableOpacity>
                            <Text style={styles.h1}>Confirme os dados</Text>
                        </View>

                        <View style={styles.infoBox}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>Nome</Text>
                                <Text style={styles.infoValue}>{qrData.name || '-'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoLabel}>CPF</Text>
                                <Text style={styles.infoValue}>{qrData.cpf || '-'}</Text>
                            </View>
                            <View style={[styles.infoRow, !qrData.plate && !qrData.email && styles.infoRowLast]}>
                                <Text style={styles.infoLabel}>Tipo</Text>
                                <Text style={styles.infoValue}>{qrData.type_user || '-'}</Text>
                            </View>
                            {qrData.plate && (
                                <View style={[styles.infoRow, !qrData.email && styles.infoRowLast]}>
                                    <Text style={styles.infoLabel}>Placa</Text>
                                    <Text style={styles.infoValue}>{qrData.plate}</Text>
                                </View>
                            )}
                            {qrData.email && (
                                <View style={[styles.infoRow, styles.infoRowLast]}>
                                    <Text style={styles.infoLabel}>Email</Text>
                                    <Text style={styles.infoValue}>{qrData.email}</Text>
                                </View>
                            )}
                        </View>

                        <TouchableOpacity
                            style={[styles.btnConfirmar, loading && styles.btnDisabled]}
                            onPress={confirmarEntrada}
                            disabled={loading}
                        >
                            <Text style={styles.textBtn}>Confirmar Entrada</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btnCancelar}
                            onPress={resetarLeitura}
                            disabled={loading}
                        >
                            <Text style={styles.textBtn}>Cancelar</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
                <LoadingOverlay visible={loading} text="Registrando..." />
            </View>
        );
    }

    // Câmera ativa
    return (
        <View style={styles.container}>
            <StatusBar style="inverted" />

            {/* Câmera em tela cheia (só monta com a tela em foco) */}
            {isFocused && (
                <CameraView
                    style={StyleSheet.absoluteFill}
                    facing="back"
                    enableTorch={torch}
                    barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                />
            )}

            {/* Máscara escura com janela de leitura */}
            <View style={styles.mask} pointerEvents="none">
                <View style={styles.maskTop} />
                <View style={styles.maskMiddle}>
                    <View style={styles.maskSide} />
                    <View style={styles.frame}>
                        <View style={[styles.corner, styles.cornerTL]} />
                        <View style={[styles.corner, styles.cornerTR]} />
                        <View style={[styles.corner, styles.cornerBL]} />
                        <View style={[styles.corner, styles.cornerBR]} />
                    </View>
                    <View style={styles.maskSide} />
                </View>
                <View style={styles.maskBottom}>
                    <Text style={styles.hint}>Aponte a câmera para o QR Code</Text>
                </View>
            </View>

            {/* Barra superior */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.btnBack} onPress={voltar}>
                    <Ionicons name="arrow-back-outline" size={26} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTitle}>Escanear QR Code</Text>
            </View>

            {/* Lanterna */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={[styles.btnTorch, torch && styles.btnTorchOn]}
                    onPress={() => setTorch((prev) => !prev)}
                >
                    <Ionicons name={torch ? "flash" : "flash-off"} size={26} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}