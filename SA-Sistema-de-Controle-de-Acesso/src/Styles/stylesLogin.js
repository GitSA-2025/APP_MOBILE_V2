import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#27445B",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.9,
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.45,
    height: 70,
    resizeMode: "contain",
    marginBottom: 12,
  },
  h1: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    marginVertical: 4,
    textAlign: "center",
  },
  h4: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    marginVertical: 6,
    textAlign: "center",
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    marginVertical: 5,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
  },
  textLink: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#27445B",
    textDecorationLine: "underline",
    marginVertical: 4,
  },
  textBtn: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    color: "#fff",
  },
  btnAvancar: {
    backgroundColor: "#8E2927",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  textLinkBottom: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#27445B",
    textDecorationLine: "underline",
    marginTop: 4,
  },
});

export default styles;
