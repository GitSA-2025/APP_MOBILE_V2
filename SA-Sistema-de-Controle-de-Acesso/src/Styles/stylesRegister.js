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
    alignItems: 'center'
  },

  exitButton: {
    backgroundColor: '#d61818ff',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    textAlign: 'center',
  },

  exitButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12
  },

  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
