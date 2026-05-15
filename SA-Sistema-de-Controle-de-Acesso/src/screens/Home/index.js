import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const { width, height } = Dimensions.get("window");
  return (
    <View>
        <StatusBar style='inverted'/>
      
    </View>
  );
}
