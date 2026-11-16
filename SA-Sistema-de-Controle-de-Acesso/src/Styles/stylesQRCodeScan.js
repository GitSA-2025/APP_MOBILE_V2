import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const FRAME_SIZE = width * 0.7;
const TOP_BAR_HEIGHT = 75;
const DIM = "rgba(0, 0, 0, 0.6)";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27445B",
  },

  // ============ CÂMERA ============
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: TOP_BAR_HEIGHT,
    paddingTop: 30,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2B3D52",
    zIndex: 10,
  },
  btnBack: {
    padding: 6,
    marginRight: 12,
  },
  topBarTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 20,
    fontFamily: "Inter_500Medium",
  },

  // Máscara escura com "janela" central de leitura
  mask: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: TOP_BAR_HEIGHT,
  },
  maskTop: {
    flex: 1,
    backgroundColor: DIM,
  },
  maskMiddle: {
    flexDirection: "row",
    height: FRAME_SIZE,
  },
  maskSide: {
    flex: 1,
    backgroundColor: DIM,
  },
  maskBottom: {
    flex: 1,
    backgroundColor: DIM,
    alignItems: "center",
    paddingTop: 24,
  },
  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
  },
  corner: {
    position: "absolute",
    width: 36,
    height: 36,
    borderColor: "#fff",
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4, borderTopLeftRadius: 12 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4, borderTopRightRadius: 12 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4, borderBottomLeftRadius: 12 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4, borderBottomRightRadius: 12 },
  hint: {
    color: "#fff",
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 40,
    alignItems: "center",
  },
  btnTorch: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  btnTorchOn: {
    backgroundColor: "#8E2927",
  },

  // ============ PERMISSÃO ============
  centered: {
    flex: 1,
    backgroundColor: "#27445B",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  permissionText: {
    color: "#fff",
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },

  // ============ POPUP DE CONFIRMAÇÃO ============
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#27445B",
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  h1: {
    flex: 1,
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    marginVertical: 4,
    textAlign: "center",
    marginRight: 24,
  },
  infoBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#27445B",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  infoRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  infoRowLast: {
    borderBottomWidth: 0,
  },
  infoLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#555",
  },
  infoValue: {
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    color: "#27445B",
    marginTop: 2,
  },
  textBtn: {
    fontFamily: "Inter_500Medium",
    fontSize: 20,
    color: "#fff",
  },
  btnConfirmar: {
    backgroundColor: "#8E2927",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  btnCancelar: {
    backgroundColor: "#6B7A89",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  btnDisabled: {
    opacity: 0.6,
  },
});

export default styles;