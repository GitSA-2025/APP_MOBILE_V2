import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AnimatedSelect({
  label,
  iconName,
  value,
  onValueChange,
  options = [],
}) {
  const [visible, setVisible] = useState(false);

  const floating = !!value;

  const labelPosition = useSharedValue(0);

  useEffect(() => {
    labelPosition.value = withTiming(floating ? -30 : 0, {
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    });
  }, [floating]);

  const labelStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: labelPosition.value,
      },
      {
        scale: withTiming(floating ? 0.8 : 1),
      },
    ],
  }));

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setVisible(true)}
        style={{ width: "100%" }}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.labelContainer,
              labelStyle,
              floating && styles.labelFocused,
            ]}
          >
            <MaterialCommunityIcons
              name={iconName}
              size={24}
              color="#27445B"
            />

            <Animated.Text style={styles.label}>
              {label}
            </Animated.Text>
          </Animated.View>

          <View style={styles.valueContainer}>
            <Text
              style={[
                styles.value,
                !value && { color: "transparent" },
              ]}
            >
              {value || ""}
            </Text>

            <MaterialCommunityIcons
              name="chevron-down"
              size={28}
              color="#27445B"
            />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={visible}
        animationType="fade"
        transparent
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <Text style={styles.title}>{label}</Text>

            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => {
                  onValueChange(item.value);
                  setVisible(false);
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color="#27445B"
                />

                <Text style={styles.optionText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cancel}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.cancelText}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginVertical: 10,
  },

  labelContainer: {
    position: "absolute",
    left: 15,
    top: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 5,
  },

  labelFocused: {
    left: 5,
  },

  label: {
    marginLeft: 5,
    fontSize: 16,
    color: "#27445B",
    fontFamily: "Roboto_500Medium",
  },

  valueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  value: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
    fontFamily: "Roboto_400Regular",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.45)",
    justifyContent: "center",
    padding: 25,
  },

  modal: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    overflow: "hidden",
  },

  title: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    padding: 18,
    color: "#27445B",
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderTopWidth: 1,
    borderColor: "#EEE",
  },

  optionText: {
    marginLeft: 15,
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
  },

  cancel: {
    borderTopWidth: 1,
    borderColor: "#EEE",
    padding: 18,
  },

  cancelText: {
    textAlign: "center",
    color: "#D32F2F",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },
});