import { StyleSheet } from "react-native";

const stylesModal = StyleSheet.create({
  openButton: {
    marginTop: 20,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#27445B",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  openButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: "rgba(0, 0, 0, 0.5)",

    zIndex: 999,
    elevation: 999,
  },

  keyboardContainer: {
    flex: 1,
    width: "100%",

    paddingHorizontal: 24,
    paddingVertical: 30,

    alignItems: "center",
    justifyContent: "center",
  },

  modalBox: {
    width: "100%",
    maxWidth: 420,

    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 24,

    borderRadius: 18,
    backgroundColor: "#FFFFFF",

    elevation: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },

  modalHeader: {
    width: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalTitle: {
    flex: 1,

    color: "#27445B",
    fontSize: 25,
    fontWeight: "700",
  },

  closeButton: {
    width: 42,
    height: 42,

    marginLeft: 12,

    alignItems: "center",
    justifyContent: "center",
  },

  description: {
    marginTop: 12,
    marginBottom: 22,

    color: "#666666",
    fontSize: 15,
    lineHeight: 22,
  },

  inputContainer: {
    width: "100%",
    alignItems: "stretch",
  },

  buttons: {
    width: "100%",

    marginTop: 24,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",

    gap: 10,
  },

  cancelButton: {
    minWidth: 105,

    paddingVertical: 12,
    paddingHorizontal: 18,

    borderWidth: 1,
    borderColor: "#27445B",
    borderRadius: 8,

    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    color: "#27445B",
    fontSize: 15,
    fontWeight: "600",
  },

  confirmButton: {
    minWidth: 105,

    paddingVertical: 13,
    paddingHorizontal: 18,

    borderRadius: 8,
    backgroundColor: "#27445B",

    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default stylesModal;