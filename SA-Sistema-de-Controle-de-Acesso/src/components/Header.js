import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Componente Header customizável
const Header = ({
  title = 'Sistema de Acesso', // Texto do título padrão
  showSearch = true,        // Controle para mostrar ou não o input de busca
  showLogo = true,          // Controle para mostrar ou não o logo
}) => {

  const navigation = useNavigation();

  return (
    <View style={[styles.header, { position: 'relative', zIndex: 100 }]}>

      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.menuButton}
      >
        <Feather
          name="menu"
          size={28}
          color="white"
        />
      </TouchableOpacity>

      {/* Título do Header */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Logo do lado direito */}
      {showLogo && (
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Logo_Kozzy.png')}
            style={{ width: '90%', height: '80%' }} // Ajusta o tamanho do logo
          />
        </View>
      )}
    </View>
  );
};

// =================== ESTILOS ===================
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2B3D52', // Cor de fundo do header
    height: 75,                  // Altura do header
    flexDirection: 'row',        // Layout horizontal
    alignItems: 'center',        // Centraliza verticalmente
    paddingHorizontal: 12,       // Espaço interno lateral
    justifyContent: 'space-between', // Espaça os elementos
    position: 'relative',
    paddingTop: 30               // Para dar espaçamento no topo (status bar)
  },

  menuButton: {
    padding: 6,
    marginRight: 12, // Espaço entre botão e título
  },

  headerTitle: {
    color: 'white',
    fontSize: 20,
    flex: 1, // Faz o título ocupar o espaço restante
    fontFamily: 'Inter_500Medium'
  },

  logoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: 100,
  },
});

export default Header;