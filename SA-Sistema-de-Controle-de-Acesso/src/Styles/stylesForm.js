import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#27445B",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  h1: {
    flex: 1,
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    marginVertical: 4,
    textAlign: "center",
    marginRight: 24
  },

  h4: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    marginVertical: 6,
    textAlign: "center",
    color: "#555",
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
    paddingHorizontal: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  tbx: {
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    padding: 10,
    borderColor: '#27445B',
    borderWidth: 1,
    borderRadius: 8,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 3,
  },

  formRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
    marginTop: 10,
  },
  dateGroup: {
    flex: 1,
    minWidth: 130,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    marginBottom: 4,
    color: '#333',
  },
  tbx: {
    backgroundColor: '#fff',
    fontFamily: 'Roboto_400Regular',
    fontSize: 14,
    padding: 10,
    borderColor: '#27445B',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%', // agora faz sentido, porque tbx está dentro de dateGroup, não dividindo row com o botão

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
})

export default styles;