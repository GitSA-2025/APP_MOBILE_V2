import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import Header from "../../components/Header";
import styles from "../../Styles/stylesRegister";
import { useNavigation } from "@react-navigation/native";

const DATA = [
  { id: "1", data: "12-12-2022", nome: "Jorge", hr_entrada: "12:20:23", hr_saida: "18:20:10", placa: "-" },
  { id: "2", data: "12-12-2022", nome: "Maria", hr_entrada: "12:20:23", hr_saida: "18:20:10", placa: "-" },
  { id: "3", data: "12-12-2022", nome: "MaryDu", hr_entrada: "12:20:23", hr_saida: "18:20:10", placa: "-" },
];

export default function DeliveryRegister() {

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.rowTab}>
      <Text style={[styles.tableCell, styles.cellDate]}>{item.data}</Text>
      <Text style={[styles.tableCell, styles.cellName]}>{item.nome}</Text>
      <Text style={[styles.tableCell, styles.cellTime]}>{item.hr_entrada}</Text>
      <Text style={[styles.tableCell, styles.cellTime]}>{item.hr_saida}</Text>
      <Text style={[styles.tableCell, styles.cellPlate]}>{item.placa}</Text>
      
      
      <TouchableOpacity style={[styles.cellEdit]}>
        <Feather name="edit-2" size={14} color="white" />
        <Text style={styles.textEdit}>Editar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="inverted" />

      {/* Cabeçalho 1*/}
      <Header />

      {/* Cabeçalho 2*/}
      <View style={styles.header}>
        <Text style={styles.textHeader}>Fila de Entregas</Text>
        <TouchableOpacity style={styles.btnCriar} onPress={() => {navigation.navigate('CreateDeliveryRegister')}}>
          <Feather name="plus" size={20} color="white" />
          <Text style={styles.textBtn}>Criar registro de entrega</Text>
        </TouchableOpacity>
      </View>

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
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          
      </View>
    </View>
  );
}