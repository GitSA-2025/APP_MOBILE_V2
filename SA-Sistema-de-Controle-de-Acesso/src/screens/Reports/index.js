import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import Header from '../../components/Header'
import styles from "../../Styles/stylesRegister";
import { Octicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

export default function Reports() {

  const navigation = useNavigation();

  const handleGraphicReport = () => {
        // Navega para a tela de relatório de fluxo de pessoas em gráfico
        navigation.replace('GraphicReport');
    }

  return (
    <View>
      <StatusBar style="inverted" />

      {/* Cabeçalho 1*/}
      <Header />

      {/* Cabeçalho 2*/}
      <View style={styles.header}>
        <Text style={styles.textHeader}>Relatórios</Text>
      </View>

      <View style={{padding: 20}}>
        <TouchableOpacity style={[styles.btnCriar, {marginBottom: 12}]} onPress={handleGraphicReport}>
            <Octicons name="graph" size={24} color="white" />
            <Text style={[styles.textBtn, {fontSize: 18, paddingLeft: 10}]}>
                Gráfico de tipo de pessoas
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnCriar, {marginBottom: 12}]}>
            <Octicons name="graph" size={24} color="white" />
            <Text style={[styles.textBtn, {fontSize: 18, paddingLeft: 10}]}>
                Gráfico de tipo de pessoas
            </Text>
        </TouchableOpacity>
        
      </View>

    </View>
  )
}