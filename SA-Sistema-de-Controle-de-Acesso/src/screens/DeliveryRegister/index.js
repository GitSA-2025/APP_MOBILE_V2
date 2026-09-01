import React, { useCallback, useState } from "react";
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

import Animated, { FadeInDown, SlideInLeft, withTiming, Easing, ZoomIn, LinearTransition } from 'react-native-reanimated';

const DATA = [
  { id: "1", data: "12-12-2022", nome: "Jorgee", hr_entrada: "12:20:23", hr_saida: "18:20:10", placa: "-" },
  { id: "2", data: "12-12-2022", nome: "Maria", hr_entrada: "12:20:23", hr_saida: "18:20:10", placa: "-" },
  { id: "3", data: "12-12-2022", nome: "MaryDu", hr_entrada: "12:20:23", hr_saida: "18:20:10", placa: "-" },
];

export default function DeliveryRegister() {

  const navigation = useNavigation();

  const [focusKey, setFocusKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setFocusKey((prev) => prev + 1);
    }, [])
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
        <FlatList
          data={DATA}
          key={focusKey}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          itemLayoutAnimation={LinearTransition}
        />

      </View>
    </View>
  );
}