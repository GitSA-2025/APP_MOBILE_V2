import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";
import styles from "../../Styles/stylesRegister";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from '../../api/api';

import LoadingOverlay from '../../components/LoadingOverlay';

import Animated, { FadeInDown, SlideInLeft, withTiming, Easing, ZoomIn, LinearTransition } from 'react-native-reanimated';


export default function DeliveryRegister() {

  const navigation = useNavigation();

  const [focusKey, setFocusKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [entregas, setEntregas] = useState([]);
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    AsyncStorage.getItem('userEmail').then(setUserEmail);
  }, []);

  useEffect(() => {
    if (userEmail) {
      fetchEntregas(userEmail);
    }
  }, [userEmail]);


  async function fetchEntregas(userEmail) {
    try {
      const res = await api.post('/api/mobile/app/exibirEntregas', { user_email: userEmail });
      setEntregas(res.data);
    } catch (err) {
      console.error('Erro ao carregar entregas:', err.response?.data);
    }

  }

  useFocusEffect(
    useCallback(() => {
      if (!userEmail) return;
      fetchEntregas(userEmail);
      setFocusKey((prev) => prev + 1);
    }, [userEmail])
  );

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

      {/* Cabeçalho 1*/}
      <Header />

      {/* Cabeçalho 2*/}
      <Animated.View style={styles.header} key={focusKey} entering={FadeInDown.duration(250).damping(18)}>
        <Text style={styles.textHeader}>Fila de Entregas</Text>
        <TouchableOpacity style={styles.btnCriar} onPress={() => { navigation.replace('CreateDeliveryRegister') }}>
          <Feather name="plus" size={20} color="white" />
          <Text style={styles.textBtn}>Criar registro de entrega</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Tabela com Scroll Horizontal */}

      <View style={styles.tab}>

        {/* Cabeçalho da tabela */}
        <View style={styles.tabHeader}>
          <Text style={[styles.textTabHeader, styles.cellDate]}>Data</Text>
          <Text style={[styles.textTabHeader, styles.cellName]}>Nome</Text>
          <Text style={[styles.textTabHeader, styles.cellTime]}>Hr. Entrada</Text>
          <Text style={[styles.textTabHeader, styles.cellTime]}>Fornecedor</Text>
          <Text style={[styles.textTabHeader, styles.cellPlate]}>Placa</Text>
          <Text style={[styles.textTabHeader, styles.cellEdit]}></Text>
        </View>

        {/* Lista de Dados */}
        <ScrollView>
          {entregas.map((item, index) => (
            <Animated.View key={index} style={styles.rowTab} entering={SlideInLeft.delay(index * 100).duration(400).springify()}>
              <Text style={[styles.tableCell, styles.cellDate]}>{item.date_fixed}</Text>
              <Text style={[styles.tableCell, styles.cellName]}>{item.name}</Text>
              <Text style={[styles.tableCell, styles.cellTime]}>{item.hr_entry}</Text>
              <Text style={[styles.tableCell, styles.cellTime]}>{item.industry}</Text>
              <Text style={[styles.tableCell, styles.cellPlate]}>{item.plate_vehicle || 'Ñ se aplica'}</Text>


              <TouchableOpacity style={[styles.cellEdit, styles.btnEdit]}>
                <MaterialCommunityIcons name="pencil" size={20} color="white" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

      </View>
      <LoadingOverlay visible={loading} text="Carregando..." />
    </View>
  );
}