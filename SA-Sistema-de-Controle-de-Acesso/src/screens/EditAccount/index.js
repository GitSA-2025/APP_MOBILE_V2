import { View, Text, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from '@expo/vector-icons/Ionicons';

import AnimatedInput from "../../components/AnimatedInput";

import styles from '../../Styles/stylesForm';

import { useNavigation } from '@react-navigation/native';

export default function EditAccount() {

  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

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
            <View style={styles.popup}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => {
                  navigation.navigate("App", {
                    screen: "Home"
                  })
                }}>
                  <Ionicons name="arrow-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.h1}>Editar Conta</Text>
              </View>

              
            </View>
          </ScrollView>
        </View>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}