import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import AntDesign from '@expo/vector-icons/AntDesign';

import Home from "../screens/Home";
import DeliveryRegister from '../screens/DeliveryRegister';

import CustomDrawer from "../components/CustomDrawer";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Reports from '../screens/Reports';
import QRCodeApproval from '../screens/QRCodeApproval';


const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveTintColor: "#FFFFFF",
                drawerInactiveTintColor: "#D9D9D9",

                drawerActiveBackgroundColor: "#3F5A7A",
                drawerInactiveBackgroundColor: "transparent",

                drawerLabelStyle: {
                    fontSize: 16,
                    fontFamily: "Inter_500Medium",
                },

                drawerStyle: {
                    backgroundColor: "#2B3D52",
                    width: 280,
                },
            }}>
            <Drawer.Screen name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <AntDesign name="clock-circle" size={size} color={color} />
                    ),
                    drawerLabel: "Registro de Entrada"
                }} />
            <Drawer.Screen name="DeliveryRegister"
                component={DeliveryRegister}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="truck-outline" size={size} color={color} />
                    ),
                    drawerLabel: "Fila de Entrega"
                }} />
                <Drawer.Screen name="Reports"
                component={Reports}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="file-outline" size={size} color={color} />
                    ),
                    drawerLabel: "Relatórios"
                }} />
                <Drawer.Screen name="QRCodeApproval"
                component={QRCodeApproval}
                options={{
                    headerShown: false,
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="qrcode" size={size} color={color} />
                    ),
                    drawerLabel: "Aprovação de QR Code"
                }} />
        </Drawer.Navigator>
    )
}