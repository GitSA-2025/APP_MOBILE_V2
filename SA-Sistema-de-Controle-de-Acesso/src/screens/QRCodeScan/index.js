import { View, Text } from 'react-native'
import React, { useState } from 'react'

export default function QRCodeScan() {

    const [hasPermission, setHasPermission] = useState(false);

    const [scanned, setScanned] = useState(false);

    const [hasPermission, setHasPermission] = useState(null);
    // Estado para saber se o usuário deu permissão para usar a câmera

    const [scanned, setScanned] = useState(false);
    // Estado para controlar se um QR Code já foi lido

    const [qrData, setQrData] = useState(null);
    // Estado para armazenar os dados do QR Code lido

    const [loading, setLoading] = useState(false);
    // Estado para mostrar loading durante requisições

    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        // Solicita permissão para usar a câmera assim que a tela é montada
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarcodeScanned = ({ data }) => {
        // Função chamada quando um QR Code é detectado
        if (scanned) return; // Se já leu um QR Code, ignora

        try {
            const parsed = JSON.parse(data); // Tenta converter o QR Code de JSON para objeto
            setQrData(parsed);
            setScanned(true); // Marca como lido
        } catch {
            Alert.alert('Erro', 'QR Code inválido.');
            // Caso não seja um JSON válido
        }
    };
    
    return (
        <View>
            <Text>index</Text>
        </View>
    )
}