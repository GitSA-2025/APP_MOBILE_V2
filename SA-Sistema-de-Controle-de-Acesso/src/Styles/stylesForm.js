import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
    backgroundColor: "#27445B",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll:{
    flexGrow:1,
    justifyContent:"center",
    alignItems:"center",
    paddingVertical:30,
    backgroundColor:"#27445B",
},
  popup: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.9,
    paddingVertical: 28,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems:"center",
    marginBottom:20,
    gap: 10
  },
  h1: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    marginVertical: 4,
    textAlign: "center",
  },
  textBtn: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    color: "#fff",
  },
  btnSalvar: {
    backgroundColor: "#8E2927",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
})

export default styles;