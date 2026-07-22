import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textHeader: {
    color: "black",
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    flexShrink: 1,
  },
  btnCriar: {
    backgroundColor: "#8E2927",
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: "center",
    gap: 4,
    borderRadius: 8,
  },
  textBtn: {
    color: "#fff",
    fontFamily: "Inter_500Medium",
    fontSize: 14,
  },
  tab: {
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: "#27445B",
    borderRadius: 8,
    margin: 16,
    overflow: "hidden",
  },
  tabHeader: {
    flexDirection: "row",
    gap: 10,
    borderBottomWidth: 1,
  },
  textTabHeader: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#27445B",
    textAlign: 'center'
  },
  rowTab: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  tableCell: {
    color: "black",
    fontFamily: "Roboto_400Regular",
    fontSize: 13,
  },
  cellDate: {
    flex: 2.2, // Espaço para "12-12-2022"
    textAlign: 'center'
  },
  cellName: {
    flex: 1.6, // Espaço para o Nome
    textAlign: 'center'
  },
  cellTime: {
    flex: 1.8, // Espaço para "12:20:23"
    textAlign: "center",
  },
  cellPlate: {
    flex: 1.5, // Espaço para o "-" ou placa menor
    textAlign: "center",
  },
  cellEdit: {
    flex: 1.1, // Espaço para o botão editar
    alignItems: "center",
  },
  textEdit: {
    color: "white",
    fontSize: 14,
  },
  btnEdit: {
    backgroundColor: "#8E2927",
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 5,
    alignItems: 'center',
  }
});

export default styles;
