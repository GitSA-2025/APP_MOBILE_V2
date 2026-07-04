//importação das bibliotecas

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Inter_700Bold, Inter_300Light, Inter_400Regular, Inter_500Medium, useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { Roboto_300Light, Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { useEffect } from 'react';

//importação das telas
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import TwoFA from './src/screens/TwoFA';
import Home from './src/screens/Home';
import CreateEntryRegister from './src/screens/CreateEntryRegister';
import DrawerRoutes from './src/navigation/drawerRoutes';
import CreateDeliveryRegister from './src/screens/CreateDeliveryRegister';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

function App() {

  //Carregamento das fontes
  const [loaded, error] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium
  });

  useEffect (() => {
    if (loaded || error){
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if(!loaded && !error){
    return null;
  }

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false}}/>
        <Stack.Screen name="TwoFA" component={TwoFA} options={{ headerShown: false}}/>
        <Stack.Screen
        name="App"
        component={DrawerRoutes}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CreateEntryRegister" component={CreateEntryRegister} options={{ headerShown: false}}/>
      <Stack.Screen name="CreateDeliveryRegister" component={CreateDeliveryRegister} options={{ headerShown: false}}/>
      {/*<Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;