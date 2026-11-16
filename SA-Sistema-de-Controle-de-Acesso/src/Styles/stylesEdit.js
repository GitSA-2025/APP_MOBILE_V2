import { StyleSheet } from "react-native";

// Estilos extras das telas de edição.
// O restante (popup, header, inputs, btnSalvar) vem de stylesForm
// e o modal de confirmação vem de stylesRegister.
const styles = StyleSheet.create({
  btnDeletar: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#8E2927",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  textBtnDeletar: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    color: "#8E2927",
  },
  modalClose: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  modalInput: {
    width: "100%",
    marginTop: 6,
    marginBottom: 20,
  },
});

export default styles;