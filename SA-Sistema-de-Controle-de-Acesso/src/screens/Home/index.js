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
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from '../../api/api';

import Animated, { FadeInDown, SlideInLeft, withTiming, Easing, ZoomIn, LinearTransition } from 'react-native-reanimated';


export default function Home() {

  const [focusKey, setFocusKey] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();

  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('userEmail').then(setUserEmail);
  }, []);



  async function fetchEntradas(userEmail) {
    try {
      const res = await api.post('/api/mobile/app/exibirEntradas', { user_email: userEmail });
      setEntradas(res.data);
    } catch (err) {
      console.error('Erro ao carregar entradas:', err.response?.data);
    }
  }

  async function marcarSaida(idregister) {
    // Marca saída de um registro específico
    try {
      setLoading(true);

      const res = await api.get(`/api/mobile/app/marcarSaidaRegistroEntrada/${idregister}`);
      console.log(res.data);
      setVisibleModal(false);
      await fetchEntradas(userEmail);
      // Atualiza a lista de registros após marcar saída
    } catch (err) {
      console.error('Erro ao registrar saída:', err.response?.data || err.message);
    } finally {
      setVisibleModal(false);
      setLoading(false);
    }
  }


  useFocusEffect(
    useCallback(() => {
      if (!userEmail) return; // evita chamada com valor vazio
      fetchEntradas(userEmail);
      setFocusKey((prev) => prev + 1);
    }, [userEmail])
  );



  const renderItem = ({ item, index }) => (
    <Animated.View style={styles.rowTab} entering={SlideInLeft.delay(index * 100).duration(400).springify()}>
      <Text style={[styles.tableCell, styles.cellDate]}>{item.data}</Text>
      <Text style={[styles.tableCell, styles.cellName]}>{item.nome}</Text>
      <Text style={[styles.tableCell, styles.cellTime]}>{item.hr_entrada}</Text>
      <Text style={[styles.tableCell, styles.cellTime]}>{item.hr_saida}</Text>
      <Text style={[styles.tableCell, styles.cellPlate]}>{item.placa}</Text>


      <TouchableOpacity style={[styles.cellEdit, styles.btnEdit]}>
        <MaterialCommunityIcons name="pencil" size={20} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />



      {/* Cabeçalho 1*/}
      <Header />

      {/* Cabeçalho 2*/}
      <Animated.View style={styles.header} key={focusKey} entering={FadeInDown.duration(250).damping(18)}>
        <Text style={styles.textHeader}>Registros de Entrada</Text>
        <TouchableOpacity style={styles.btnCriar} onPress={() => { navigation.replace('CreateEntryRegister') }}>
          <Feather name="plus" size={20} color="white" />
          <Text style={styles.textBtn}>Criar registro de entrada</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Tabela com Scroll Horizontal */}

      <View style={styles.tab}>

        {/* Cabeçalho da tabela */}
        <View style={styles.tabHeader}>
          <Text style={[styles.textTabHeader, styles.cellDate]}>Data</Text>
          <Text style={[styles.textTabHeader, styles.cellName]}>Nome</Text>
          <Text style={[styles.textTabHeader, styles.cellTime]}>Hr. Entrada</Text>
          <Text style={[styles.textTabHeader, styles.cellTime]}>Hr. Saída</Text>
          <Text style={[styles.textTabHeader, styles.cellPlate]}>Placa</Text>
          <Text style={[styles.textTabHeader, styles.cellEdit]}></Text>
        </View>

        {/* Lista de Dados */}


        <ScrollView>
          {entradas.map((item, index) => (
            <Animated.View key={index} style={styles.rowTab} entering={SlideInLeft.delay(index * 100).duration(400).springify()}>
              <Text style={[styles.tableCell, styles.cellDate]}>{item.date_fixed}</Text>
              <Text style={[styles.tableCell, styles.cellName]}>{item.name}</Text>
              <Text style={[styles.tableCell, styles.cellTime]}>{item.hr_entry}</Text>
              <Text style={[styles.tableCell, styles.cellTime]}>{item.hr_exit && item.hr_exit !== '-' ? (
                <Text>{item.hr_exit}</Text>
              ) : (
                <TouchableOpacity
                  style={styles.exitButton}
                  onPress={() => {
                    setSelectedId(item.idregister);
                    setVisibleModal(true);
                  }}
                >
                  {/* Botão para registrar saída */}
                  <Text style={styles.exitButtonText}>Registrar saída</Text>
                </TouchableOpacity>
              )}</Text>
              <Text style={[styles.tableCell, styles.cellPlate]}>{item.car_plate || 'Ñ se aplica'}</Text>


              <TouchableOpacity style={[styles.cellEdit, styles.btnEdit]}>
                <MaterialCommunityIcons name="pencil" size={20} color="white" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

      </View>
      {visibleModal && (
        // Modal de confirmação para registrar saída
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Deseja marcar saída este registro?
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => {
                  setVisibleModal(false);
                  setSelectedId(null);
                }}
              >
                <Text style={styles.buttonText}>Não</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => marcarSaida(selectedId)}
              >
                <Text style={styles.buttonText}>Sim</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}