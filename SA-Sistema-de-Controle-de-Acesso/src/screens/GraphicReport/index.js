import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";
import styles from '../../Styles/stylesForm'
import { Ionicons } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import Animated, { ZoomIn, Easing, withTiming } from 'react-native-reanimated';

export default function GraphicReport() {

  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <StatusBar style='inverted' />
          <Animated.View style={styles.popup} entering={ZoomIn.duration(800)}>
            <Animated.View style={styles.header} entering={ZoomIn.delay(200).duration(800)}>
              <TouchableOpacity onPress={() => {
                navigation.replace("App", {
                  screen: "Reports"
                })
              }}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.h1}>Gráfico de Fluxo de Pessoas</Text>
            </Animated.View>
            <Animated.Text style={styles.h4} entering={ZoomIn.delay(250).duration(800)}>Insira as datas de um determinado periodo para fazer a geração do gráfico do fluxo de pessoas que acessaram a empresa.</Animated.Text>


            <Animated.View style={styles.formRow} entering={ZoomIn.delay(300).duration(800)}>
              <View style={styles.dateGroup}>
                <Text style={styles.label}>Data Inicial:</Text>
                <TextInput style={styles.tbx} placeholder="dd/mm/aaaa" />
              </View>
              <View style={styles.dateGroup}>
                <Text style={styles.label}>Data Final:</Text>
                <TextInput style={styles.tbx} placeholder="dd/mm/aaaa" />
              </View>
            </Animated.View>

            <Animated.View style={{ width: "100%", marginTop: 12 }} entering={ZoomIn.delay(350).duration(800)}>
              <TouchableOpacity style={styles.btnSalvar}>
                <Text style={styles.textBtn}>Gerar Gráfico</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* 
          loading ? (
                    <ActivityIndicator size="large" color="#2B3D52" style={{ marginTop: 20 }} />
                ) : dados ? (
                    <View style={styles.secoundContainer}>

                        
                        <SafeAreaView style={styles.painelLeft}>
                            <Text style={styles.textDesc}>
                                Segundo os dados analisados pela IA, {totalGeral} acessaram a empresa neste periodo. Sendo elas:
                            </Text>
                            <View style={styles.labelColabo}>
                                <Text style={styles.labelText}>{valorColaboradores} Colaboradores</Text>
                            </View>
                            <View style={styles.labelVisit}>
                                <Text style={styles.labelText}>{valorVisitantes} Visitantes</Text>
                            </View>
                            <View style={styles.labelEntr}>
                                <Text style={styles.labelText}>{valorEntregadores} Entregadores</Text>
                            </View>
                        </SafeAreaView>

                        
                        <View style={styles.painelRight}>
                            <BarChart
                                data={{
                                    labels: dados.map((d) => d.label),
                                    datasets: [{
                                        data: dados.map((d) => d.value),
                                        colors: [
                                            (opacity = 1) => `rgba(46, 125, 50, ${opacity})`,
                                            (opacity = 1) => `rgba(249, 168, 37, ${opacity})`,
                                            (opacity = 1) => `rgba(239, 108, 0, ${opacity})`,
                                        ]
                                    }],
                                }}
                                width={Dimensions.get("window").width * 0.5} // Largura do gráfico
                                height={280}
                                yAxisLabel=""
                                withCustomBarColorFromData={true}
                                flatColor={true}
                                chartConfig={{
                                    backgroundColor: "#ffffffff",
                                    backgroundGradientFrom: "#f4f4f5",
                                    backgroundGradientTo: "#f4f4f5",
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(30, 30, 30, ${opacity})`,
                                    style: { borderRadius: 16 },
                                    barPercentage: 0.7,
                                    barRadius: 5,
                                }}
                                style={{ marginVertical: 10, borderRadius: 16, borderColor: '#2b3d528a', borderWidth: 2 }}
                                verticalLabelRotation={0}
                            />
                        </View>
                    </View>
                ) : (
                    // Mensagem inicial quando não há dados
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 20, color: "#666", fontSize: 20, alignItems: 'center' }}>
                            Selecione o período e gere o gráfico.
                        </Text>
                    </View>
                )
                 */}
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}